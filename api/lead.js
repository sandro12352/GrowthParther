/**
 * Función de Vercel: recibe las solicitudes del formulario "Agenda una reunión", las valida,
 * descarta el spam y las reenvía al script de Google (hoja + calendario + aviso por correo).
 *
 * Variables de entorno (Vercel → Project Settings → Environment Variables):
 *   APPS_SCRIPT_URL     URL de la aplicación web de Google Apps Script (termina en /exec).
 *   APPS_SCRIPT_SECRET  Clave compartida con el script; debe coincidir con la propiedad SECRET del script.
 *
 * Está escrito en JavaScript con CommonJS a propósito: Vercel lo ejecuta tal cual, sin compilarlo con el
 * tsconfig de Angular (que usa "module": "preserve" y rompe los archivos .ts de esta carpeta).
 */

// ---- Reglas del formulario (mantener sincronizadas con form-meeting.component.ts) ----
const OBJECTIVES = ['social-media', 'crm', 'ai', 'integrations', 'other'];
const MEDIUMS = ['video', 'phone'];
const SLOT_MINUTES = 30;
const MAX_DAYS_AHEAD = 60;
const PHONE_PATTERN = /^\+?(?:[\s().-]*\d){7,15}[\s().-]*$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Lunes a viernes: 9:00 a 13:00 y 14:00 a 16:30. Sábados: 9:00 a 12:30. Domingos cerrado. */
const WEEKDAY_SHIFTS = [
  ['09:00', '13:00'],
  ['14:00', '16:30'],
];
const SATURDAY_SHIFTS = [['09:00', '12:30']];

/** Un formulario rellenado en menos de este tiempo (ms) casi seguro lo envió un robot. */
const MIN_FILL_TIME_MS = 3000;
/** El plan gratuito de Vercel corta las funciones a los 10 s: se espera menos para poder responder con un error limpio. */
const FORWARD_TIMEOUT_MS = 8000;

const toMinutes = (time) => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

const slotsFor = (dayOfWeek) => {
  if (dayOfWeek === 0) return [];

  const slots = [];
  for (const [start, end] of dayOfWeek === 6 ? SATURDAY_SHIFTS : WEEKDAY_SHIFTS) {
    for (let minute = toMinutes(start); minute <= toMinutes(end); minute += SLOT_MINUTES) {
      slots.push(`${String(Math.floor(minute / 60)).padStart(2, '0')}:${String(minute % 60).padStart(2, '0')}`);
    }
  }
  return slots;
};

const text = (value, maxLength) =>
  typeof value === 'string' ? value.replace(/\s+/g, ' ').trim().slice(0, maxLength) : '';

/** Devuelve el mensaje de error o `null` si los datos son válidos. */
function validate(lead) {
  if (lead.name.length < 2) return 'Nombre no válido.';
  if (!EMAIL_PATTERN.test(lead.email)) return 'Correo no válido.';
  if (!PHONE_PATTERN.test(lead.phone)) return 'Teléfono no válido.';
  if (!OBJECTIVES.includes(lead.objective)) return 'Área no válida.';
  if (lead.objective === 'other' && lead.otherDetail.length < 5) return 'Describe el proceso.';
  if (!MEDIUMS.includes(lead.medium)) return 'Medio no válido.';

  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(lead.date);
  if (!match) return 'Fecha no válida.';

  const [year, month, day] = [Number(match[1]), Number(match[2]) - 1, Number(match[3])];
  const date = new Date(Date.UTC(year, month, day));
  if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month || date.getUTCDate() !== day) {
    return 'Fecha no válida.';
  }

  // Margen de ±1 día por la diferencia entre la zona horaria del servidor (UTC) y la del visitante.
  const today = new Date();
  const todayUtc = Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate());
  const dayMs = 24 * 60 * 60 * 1000;
  if (date.getTime() < todayUtc - dayMs || date.getTime() > todayUtc + (MAX_DAYS_AHEAD + 1) * dayMs) {
    return 'Fecha fuera de rango.';
  }

  if (!slotsFor(date.getUTCDay()).includes(lead.time)) return 'Hora no disponible.';

  return null;
}

/** Vercel entrega el cuerpo ya interpretado, pero se acepta también un texto JSON por si acaso. */
function readBody(request) {
  const body = request.body;
  if (body && typeof body === 'object') return body;
  if (typeof body === 'string') {
    try {
      return JSON.parse(body);
    } catch {
      return {};
    }
  }
  return {};
}

module.exports = async function handler(request, response) {
  response.setHeader('Cache-Control', 'no-store');

  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    response.status(405).json({ ok: false, error: 'Método no permitido.' });
    return;
  }

  const body = readBody(request);

  // ---- Anti-spam: campo trampa oculto y tiempo mínimo de relleno. Se responde "ok" sin reenviar nada. ----
  const honeypot = text(body.website, 200);
  const startedAt = Number(body.startedAt);
  const tooFast = Number.isFinite(startedAt) && Date.now() - startedAt < MIN_FILL_TIME_MS;
  if (honeypot || tooFast) {
    response.status(200).json({ ok: true });
    return;
  }

  const lead = {
    name: text(body.name, 100),
    email: text(body.email, 254).toLowerCase(),
    company: text(body.company, 120),
    phone: text(body.phone, 30),
    objective: text(body.objective, 30),
    otherDetail: text(body.otherDetail, 500),
    medium: text(body.medium, 20),
    date: text(body.date, 10),
    time: text(body.time, 5),
  };

  const error = validate(lead) || (body.consent === true ? '' : 'Debes aceptar la política de privacidad.');
  if (error) {
    response.status(400).json({ ok: false, error });
    return;
  }

  const scriptUrl = process.env.APPS_SCRIPT_URL;
  const secret = process.env.APPS_SCRIPT_SECRET;
  if (!scriptUrl || !secret) {
    console.error('Faltan APPS_SCRIPT_URL o APPS_SCRIPT_SECRET en las variables de entorno.');
    response.status(500).json({ ok: false, error: 'Servicio no configurado.' });
    return;
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FORWARD_TIMEOUT_MS);

  try {
    // Apps Script responde con una redirección: fetch la sigue y recibe el JSON final.
    const forwarded = await fetch(scriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ secret, ...lead, sentAt: new Date().toISOString() }),
      redirect: 'follow',
      signal: controller.signal,
    });

    const result = await forwarded.json().catch(() => null);

    if (!forwarded.ok || !result || !result.ok) {
      console.error('El script de Google no aceptó la solicitud:', forwarded.status, result);
      response.status(502).json({ ok: false, error: 'No pudimos registrar la solicitud.' });
      return;
    }

    response.status(200).json({ ok: true });
  } catch (cause) {
    console.error('Error al contactar con el script de Google:', cause);
    response.status(502).json({ ok: false, error: 'No pudimos registrar la solicitud.' });
  } finally {
    clearTimeout(timer);
  }
};
