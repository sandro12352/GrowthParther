/**
 * GrowthProject AI · Registro de solicitudes de reunión.
 *
 * Cada vez que alguien envía el formulario de la web, este script:
 *   1. añade una fila en la hoja "Solicitudes" de esta hoja de cálculo,
 *   2. crea el evento en tu Google Calendar (30 minutos) con los datos del cliente,
 *   3. te envía un correo de aviso.
 *
 * INSTALACIÓN (una sola vez):
 *   1. Crea una hoja de cálculo de Google y ábrela.
 *   2. Menú Extensiones → Apps Script. Borra el contenido y pega TODO este archivo.
 *   3. Ajustes del proyecto (engranaje) → marca "Mostrar el archivo de manifiesto appsscript.json" y,
 *      en "Zona horaria", elige la de tu negocio (los eventos se crean en esa zona).
 *   4. Ajustes del proyecto → "Propiedades de la secuencia de comandos" → añade:
 *        SECRET = una clave larga inventada por ti (la misma irá en Vercel como APPS_SCRIPT_SECRET).
 *   5. Ejecuta la función `autorizar` (botón ▶) y acepta los permisos con tu cuenta.
 *      Google avisará de "aplicación no verificada": es tu propio script, pulsa "Configuración avanzada" → "Ir a …".
 *   6. Implementar → Nueva implementación → Tipo: "Aplicación web".
 *        Ejecutar como: Yo   ·   Quién tiene acceso: Cualquier usuario.
 *      Copia la URL que termina en /exec (irá en Vercel como APPS_SCRIPT_URL).
 *
 * IMPORTANTE: cada vez que cambies este código hay que volver a implementar
 * (Implementar → Administrar implementaciones → editar → Nueva versión), o la URL seguirá usando el código antiguo.
 */

var SHEET_NAME = 'Solicitudes';
var EVENT_MINUTES = 30;

var HEADERS = [
  'Recibida',
  'Nombre',
  'Correo',
  'Teléfono',
  'Empresa',
  'Qué quiere automatizar',
  'Detalle (otro proceso)',
  'Medio',
  'Fecha de la reunión',
  'Hora',
  'Estado',
];

var OBJECTIVE_LABELS = {
  'social-media': 'Redes sociales y WhatsApp',
  'crm': 'CRM y seguimiento de leads',
  'ai': 'Atención con inteligencia artificial',
  'integrations': 'Integración de herramientas',
  'other': 'Otro proceso',
};

var MEDIUM_LABELS = {
  'video': 'Videollamada',
  'phone': 'Llamada',
  'whatsapp': 'WhatsApp',
};

/** Recibe las solicitudes de la web (función de Vercel). */
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    var secret = PropertiesService.getScriptProperties().getProperty('SECRET');
    if (!secret || data.secret !== secret) {
      return respond_({ ok: false, error: 'No autorizado.' });
    }

    saveRow_(data);
    createEvent_(data);
    notify_(data);

    return respond_({ ok: true });
  } catch (error) {
    console.error(error);
    return respond_({ ok: false, error: String(error) });
  }
}

/** Ejecútala una vez a mano para conceder los permisos (hoja, calendario y correo). */
function autorizar() {
  SpreadsheetApp.getActiveSpreadsheet();
  CalendarApp.getDefaultCalendar();
  MailApp.getRemainingDailyQuota();
}

function respond_(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(ContentService.MimeType.JSON);
}

function getSheet_() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
  }

  return sheet;
}

function saveRow_(data) {
  getSheet_().appendRow([
    new Date(),
    data.name,
    data.email,
    "'" + data.phone, // el apóstrofo evita que Sheets convierta el teléfono en número o fórmula
    data.company,
    OBJECTIVE_LABELS[data.objective] || data.objective,
    data.otherDetail,
    MEDIUM_LABELS[data.medium] || data.medium,
    data.date,
    data.time,
    'Pendiente',
  ]);
}

/** Convierte "2026-10-19" + "10:30" en una fecha, interpretada en la zona horaria del script. */
function parseMeeting_(date, time) {
  var d = date.split('-').map(Number);
  var t = time.split(':').map(Number);
  return new Date(d[0], d[1] - 1, d[2], t[0], t[1]);
}

function createEvent_(data) {
  var start = parseMeeting_(data.date, data.time);
  var end = new Date(start.getTime() + EVENT_MINUTES * 60 * 1000);

  var description = [
    'Cliente: ' + data.name,
    'Correo: ' + data.email,
    'Teléfono: ' + data.phone,
    data.company ? 'Empresa: ' + data.company : '',
    'Quiere automatizar: ' + (OBJECTIVE_LABELS[data.objective] || data.objective),
    data.otherDetail ? 'Detalle: ' + data.otherDetail : '',
    'Medio: ' + (MEDIUM_LABELS[data.medium] || data.medium),
  ]
    .filter(Boolean)
    .join('\n');

  CalendarApp.getDefaultCalendar().createEvent(
    'Reunión GrowthProject AI · ' + data.name + ' (' + (MEDIUM_LABELS[data.medium] || data.medium) + ')',
    start,
    end,
    { description: description }
  );
}

function notify_(data) {
  var to = Session.getEffectiveUser().getEmail();
  var subject = 'Nueva solicitud de reunión: ' + data.name + ' · ' + data.date + ' ' + data.time;

  var body = [
    'Nueva solicitud desde la web.',
    '',
    'Nombre: ' + data.name,
    'Correo: ' + data.email,
    'Teléfono: ' + data.phone,
    'Empresa: ' + (data.company || '—'),
    'Quiere automatizar: ' + (OBJECTIVE_LABELS[data.objective] || data.objective),
    data.otherDetail ? 'Detalle: ' + data.otherDetail : null,
    'Medio: ' + (MEDIUM_LABELS[data.medium] || data.medium),
    'Reunión: ' + data.date + ' a las ' + data.time,
    '',
    'Ya está en tu hoja de cálculo y en tu calendario.',
  ]
    .filter(function (line) {
      return line !== null;
    })
    .join('\n');

  MailApp.sendEmail(to, subject, body);
}
