import { Component, OnDestroy, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowLeft } from '@ng-icons/lucide';
import { CONTACT_EMAIL, WHATSAPP_NUMBER, whatsappUrl } from '../../../core/contact.config';
import { RevealDirective } from '../../../core/reveal.directive';
import { SeoService } from '../../../core/seo.service';

interface Section {
  /** Ancla opcional para enlazar la sección directamente (por ejemplo, desde Meta). */
  id?: string;
  title: string;
  paragraphs?: string[];
  items?: string[];
}

/**
 * Política de privacidad. Cubre la web (formulario de reunión guardado en Google Sheets, aviso por correo, chat de
 * WhatsApp, sin cookies de analítica ni publicidad) y el servicio de chatbot de WhatsApp con IA (mensajes cifrados con
 * retención de 7 días, claves de IA y tokens de WhatsApp cifrados). Si cambia algo de eso, hay que actualizarla.
 */
@Component({
  selector: 'app-privacy-policy',
  imports: [RouterLink, NgIcon, RevealDirective],
  providers: [provideIcons({ lucideArrowLeft })],
  template: `
    <!-- Mismo contenedor que la barra del header: px-4/lg:px-6 por fuera, lg:max-w-[80vw] y px-4/lg:px-6 por dentro -->
    <section class="relative overflow-hidden bg-[#130735] px-4 pb-20 pt-36 text-white lg:px-6 lg:pb-24 lg:pt-44">
      <div class="pointer-events-none absolute inset-0 overflow-hidden">
        <div class="absolute left-1/2 top-1/4 h-[420px] w-[620px] -translate-x-1/2 rounded-full bg-[#6C5CE7]/20 blur-[120px]"></div>
      </div>
      <div appReveal revealStagger class="relative mx-auto px-4 lg:max-w-[80vw] lg:px-6">
        <a routerLink="/" class="inline-flex items-center gap-2 text-sm font-medium text-white/70 transition hover:text-white">
          <ng-icon name="lucideArrowLeft" size="16" />
          Volver al inicio
        </a>
        <h1 class="mt-8 text-balance text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl">Política de privacidad</h1>
        <p class="mt-5 max-w-3xl text-base leading-7 text-white/75 md:text-lg">
          Cómo tratamos los datos personales de quienes nos contactan a través de esta web, del formulario de reunión o de WhatsApp, y de quienes usan o
          escriben a un asistente de WhatsApp con inteligencia artificial que opera con nuestra plataforma.
        </p>
        <p class="mt-4 text-sm text-white/60">Última actualización: {{ updated }}</p>
      </div>
    </section>

    <div class="bg-white px-4 py-16 lg:px-6 lg:py-24">
      <div class="mx-auto px-4 lg:grid lg:max-w-[80vw] lg:grid-cols-[minmax(0,48rem)_minmax(0,1fr)] lg:gap-16 lg:px-6">
      <article class="min-w-0">
        @for (section of sections; track section.title; let i = $index) {
        <section class="mt-12 first:mt-0" style="scroll-margin-top: 40vh" [attr.id]="anchor(section)">
          <h2 class="text-2xl font-bold tracking-tight text-[#080911]">{{ i + 1 }}. {{ section.title }}</h2>
          @for (paragraph of section.paragraphs ?? []; track paragraph) {
          <p class="mt-4 text-base leading-7 text-black/75">{{ paragraph }}</p>
          }
          @if (section.items) {
          <ul class="mt-4 space-y-2 pl-5 text-base leading-7 text-black/75">
            @for (item of section.items; track item) {
            <li class="list-disc marker:text-[#6C5CE7]">{{ item }}</li>
            }
          </ul>
          }
        </section>
        }

        <section id="contacto" style="scroll-margin-top: 40vh" class="mt-12 rounded-2xl border border-black/10 bg-[#f7f7fa] p-6">
          <h2 class="text-2xl font-bold tracking-tight text-[#080911]">{{ sections.length + 1 }}. Contacto</h2>
          <p class="mt-4 text-base leading-7 text-black/75">Para cualquier consulta sobre esta política o para ejercer tus derechos, escríbenos:</p>
          <ul class="mt-4 space-y-2 text-base leading-7 text-black/75">
            <li>
              Correo:
              <a [href]="'mailto:' + email" class="font-semibold text-[#5b49d6] underline underline-offset-4 hover:text-[#6C5CE7]">{{ email }}</a>
            </li>
            @if (whatsapp) {
            <li>
              WhatsApp:
              <a [href]="whatsapp" target="_blank" rel="noopener noreferrer" class="font-semibold text-[#5b49d6] underline underline-offset-4 hover:text-[#6C5CE7]">{{ phone }}</a>
            </li>
            }
          </ul>
        </section>
      </article>

      <!-- Índice: solo en escritorio, fijo mientras se lee -->
      <aside class="hidden lg:block">
        <nav aria-label="Índice de la política" class="sticky top-32 rounded-2xl border border-black/10 bg-[#f7f7fa] p-5">
          <p class="text-xs font-bold uppercase tracking-[0.14em] text-black/50">En esta página</p>
          <ol class="mt-4 space-y-2 text-sm leading-5">
            @for (section of sections; track section.title; let i = $index) {
            <li>
              <a [attr.href]="'#' + anchor(section)" (click)="goTo($event, anchor(section))" class="flex gap-2 text-black/70 transition hover:text-[#5b49d6]">
                <span class="w-5 shrink-0 text-black/40">{{ i + 1 }}.</span>
                <span>{{ section.title }}</span>
              </a>
            </li>
            }
            <li>
              <a href="#contacto" (click)="goTo($event, 'contacto')" class="flex gap-2 text-black/70 transition hover:text-[#5b49d6]">
                <span class="w-5 shrink-0 text-black/40">{{ sections.length + 1 }}.</span>
                <span>Contacto</span>
              </a>
            </li>
          </ol>
        </nav>
      </aside>
      </div>
    </div>
  `,
})
export class PrivacyPolicyComponent implements OnDestroy {
  private readonly seo = inject(SeoService);

  protected readonly updated = '14 de noviembre de 2026';
  protected readonly email = CONTACT_EMAIL;
  protected readonly whatsapp = whatsappUrl('Hola, tengo una consulta sobre mis datos personales.');
  protected readonly phone = WHATSAPP_NUMBER ? `+${WHATSAPP_NUMBER.slice(0, 2)} ${WHATSAPP_NUMBER.slice(2, 5)} ${WHATSAPP_NUMBER.slice(5, 8)} ${WHATSAPP_NUMBER.slice(8)}` : '';

  /** Lleva la sección a la zona media de la pantalla (40 % desde arriba) y actualiza el #ancla sin recargar. */
  protected goTo(event: Event, id: string): void {
    event.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.4;
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    history.replaceState(null, '', `#${id}`);
  }

  /** Ancla de la sección: su id, o el título sin tildes ni espacios. */
  protected anchor(section: Section): string {
    return (
      section.id ??
      section.title
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
    );
  }

  protected readonly sections: Section[] = [
    {
      title: 'Quiénes somos',
      paragraphs: [
        'GrowthProject AI (en adelante, «nosotros») ofrece servicios de automatización de procesos, inteligencia artificial, CRM e integración de herramientas digitales. Esta web es www.growthprojectai.com.',
        'Somos el responsable del tratamiento de los datos personales que nos facilitas a través de esta web, del formulario de reunión o de WhatsApp, conforme a la Ley N.º 29733, Ley de Protección de Datos Personales de Perú, y su reglamento.',
        'Además ofrecemos una plataforma de asistentes de WhatsApp con inteligencia artificial que las empresas clientes configuran para atender a sus propios clientes. En ese servicio, la empresa cliente decide para qué usa los datos de sus clientes finales y nosotros actuamos como su encargado del tratamiento (ver la sección «Servicio de asistentes de WhatsApp con IA»).',
      ],
    },
    {
      title: 'Qué datos recogemos',
      paragraphs: ['Recogemos solo los datos que tú nos das al contactarnos:'],
      items: [
        'Formulario de reunión: nombre, correo electrónico, teléfono, empresa (opcional), qué proceso quieres automatizar, detalle adicional (si eliges «Otro proceso»), el medio preferido para la reunión (Google Meet o llamada telefónica), y la fecha y hora que eliges.',
        'WhatsApp: tu número de teléfono y el contenido de los mensajes que nos envías.',
        'Datos técnicos básicos de la visita (como dirección IP y navegador) que el servicio de alojamiento de la web recibe de forma habitual al atender cada solicitud.',
      ],
    },
    {
      title: 'Servicio de asistentes de WhatsApp con IA',
      paragraphs: [
        'Esta sección aplica a la plataforma que usan las empresas clientes para atender a sus clientes por WhatsApp con un asistente de inteligencia artificial. Si eres cliente final de una de esas empresas, quien decide para qué se usan tus datos es esa empresa, y nosotros los tratamos por su cuenta y siguiendo sus instrucciones.',
        'Los datos que tratamos en este servicio son:',
      ],
      items: [
        'De la empresa cliente: correo y datos de su cuenta, el nombre de su empresa, la configuración de su asistente (instrucciones, tono y reglas), la conexión con su número de WhatsApp Business y la clave de su proveedor de inteligencia artificial.',
        'De los clientes finales que escriben a la empresa por WhatsApp: su número de teléfono, el nombre de perfil que WhatsApp nos comunique y el contenido de los mensajes de texto.',
        'Registros de uso (por ejemplo, la cantidad de mensajes procesados y de tokens consumidos) y registros de seguridad de las acciones realizadas en la cuenta.',
      ],
    },
    {
      title: 'Inteligencia artificial y proveedores',
      paragraphs: [
        'Para redactar las respuestas, el texto del mensaje del cliente final y el historial reciente de esa conversación se envían al proveedor de inteligencia artificial que la empresa cliente haya elegido, usando la clave de la propia empresa. La plataforma permite conectar proveedores como Google (Gemini), OpenAI (modelos GPT) y Anthropic (Claude), entre otros, y cada empresa cliente elige cuál usar al conectar su cuenta. Nosotros no elegimos el proveedor por ella: el tratamiento que haga cada proveedor se rige por sus propias condiciones y política de privacidad, que la empresa cliente acepta al crear su clave.',
        'Nosotros no usamos el contenido de las conversaciones para entrenar modelos de inteligencia artificial.',
        'Las respuestas del asistente son generadas por inteligencia artificial y pueden contener errores. El asistente está configurado para no inventar precios, disponibilidad ni condiciones que no le haya dado la empresa, y para derivar a una persona cuando no sabe algo.',
        'También intervienen Meta (plataforma de WhatsApp Business, que nos entrega los mensajes y a través de la cual enviamos las respuestas) y los proveedores de infraestructura y alojamiento que sostienen la plataforma.',
      ],
    },
    {
      title: 'Para qué usamos tus datos',
      items: [
        'Responder tu consulta y coordinar la reunión que solicitas.',
        'Contactarte por el medio que nos indicas para darte información sobre nuestros servicios.',
        'Mantener un registro interno de las solicitudes recibidas.',
        'Mejorar la web y nuestra atención.',
        'En el servicio de asistentes de WhatsApp: recibir los mensajes de los clientes finales, generar y enviar la respuesta del asistente, mantener el contexto de la conversación, medir el consumo y garantizar la seguridad de la plataforma.',
      ],
      paragraphs: ['No vendemos tus datos ni los usamos para fines distintos de los anteriores sin tu consentimiento.'],
    },
    {
      title: 'Base de legitimación',
      paragraphs: [
        'Tratamos tus datos con tu consentimiento, que nos das al enviar el formulario o al escribirnos por WhatsApp. Puedes retirarlo en cualquier momento escribiéndonos a nuestro correo.',
      ],
    },
    {
      title: 'Dónde se guardan y con quién se comparten',
      paragraphs: [
        'Para prestar el servicio nos apoyamos en proveedores que tratan datos por cuenta nuestra:',
      ],
      items: [
        'Google (Google Sheets y Gmail): las solicitudes del formulario se guardan en una hoja de cálculo de Google y recibimos un aviso por correo electrónico.',
        'Vercel: servicio de alojamiento de la web, por donde pasa el envío del formulario.',
        'WhatsApp (Meta): si nos escribes por WhatsApp, la conversación se rige también por las condiciones y la política de privacidad de WhatsApp.',
      ],
    },
    {
      title: 'Transferencia internacional',
      paragraphs: [
        'Estos proveedores pueden tratar los datos en servidores ubicados fuera de Perú. Elegimos servicios que aplican medidas de seguridad reconocidas.',
      ],
    },
    {
      title: 'Cuánto tiempo conservamos tus datos',
      paragraphs: [
        'Datos de la web y del formulario: los conservamos mientras dure la gestión de tu solicitud o la relación comercial con nosotros, y hasta que nos pidas su eliminación.',
        'Mensajes de los asistentes de WhatsApp: el historial que el asistente usa como contexto se guarda cifrado, con un máximo de 20 mensajes por conversación, y se elimina automáticamente a los 7 días desde el último mensaje de esa conversación. Cada nuevo mensaje renueva ese plazo.',
        'Datos de la cuenta de la empresa cliente: mientras la cuenta esté activa y durante el tiempo necesario para atender obligaciones de facturación y seguridad; después se eliminan o anonimizan.',
        'Registros de uso y de seguridad: se conservan mientras sean necesarios para controlar el consumo, prevenir abusos y atender obligaciones legales.',
      ],
    },
    {
      title: 'Tus derechos',
      paragraphs: [
        'La Ley N.º 29733 te reconoce estos derechos sobre tus datos personales, que puedes ejercer gratuitamente:',
      ],
      items: [
        'Acceso: saber qué datos tuyos tenemos.',
        'Rectificación: corregir datos inexactos o desactualizados.',
        'Cancelación: pedir que eliminemos tus datos.',
        'Oposición: pedir que dejemos de usar tus datos para una finalidad concreta.',
      ],
    },
    {
      title: 'Cómo ejercer tus derechos',
      paragraphs: [
        'Escríbenos al correo indicado al final de esta página, indicando qué derecho quieres ejercer y el nombre y teléfono con los que nos contactaste. Responderemos en los plazos que establece la ley.',
        'Si consideras que no hemos atendido tu solicitud, puedes acudir a la Autoridad Nacional de Protección de Datos Personales de Perú.',
      ],
    },
    {
      id: 'eliminacion-de-datos',
      title: 'Eliminación de datos',
      paragraphs: [
        'Puedes pedirnos que eliminemos tus datos personales en cualquier momento, incluidos los de las conversaciones de WhatsApp con un asistente que opere con nuestra plataforma.',
      ],
      items: [
        'Escribe al correo de contacto de esta página con el asunto «Eliminación de datos».',
        'Indica el nombre y el número de teléfono de WhatsApp con los que escribiste y, si lo sabes, a qué empresa le escribiste.',
        'Verificaremos tu identidad, eliminaremos los datos que tengamos asociados a ese número y te confirmaremos por el mismo medio cuando esté hecho.',
      ],
    },
    {
      title: 'Seguridad',
      paragraphs: [
        'Aplicamos medidas razonables para proteger tus datos, como el acceso restringido a la hoja de cálculo donde se guardan. Ningún sistema es completamente infalible, pero trabajamos para reducir los riesgos.',
        'En la plataforma de asistentes de WhatsApp, el contenido de las conversaciones, las claves de los proveedores de inteligencia artificial y los tokens de acceso a WhatsApp se guardan cifrados. Los datos de cada empresa están aislados de los de las demás, y las acciones sensibles de la cuenta quedan registradas.',
        'Si ocurriera un incidente de seguridad que afecte tus datos personales, te lo comunicaremos, y a las empresas clientes cuando les afecte, sin dilación indebida.',
      ],
    },
    {
      title: 'Cookies y almacenamiento en tu navegador',
      paragraphs: [
        'Esta web no utiliza cookies de publicidad ni herramientas de analítica. Solo guarda en tu navegador, de forma temporal, dos preferencias para mejorar la visita: que ya viste la pantalla de carga y que ya se mostró el mensaje del botón de WhatsApp. Si en el futuro incorporamos analítica o publicidad, actualizaremos esta política.',
      ],
    },
    {
      title: 'Menores de edad',
      paragraphs: ['Nuestros servicios están dirigidos a empresas y personas mayores de edad. No recogemos de forma intencionada datos de menores.'],
    },
    {
      title: 'Enlaces a otros sitios',
      paragraphs: [
        'Esta web enlaza a redes sociales (Instagram, Facebook) y a WhatsApp. Cada una tiene su propia política de privacidad, de la que no somos responsables.',
      ],
    },
    {
      title: 'Cambios en esta política',
      paragraphs: ['Podemos actualizar esta política. La fecha de la última actualización aparece al inicio de la página.'],
    },
  ];

  constructor() {
    this.seo.apply({
      title: 'Política de privacidad | GrowthProject AI',
      description:
        'Cómo GrowthProject AI trata los datos personales que recibe por el formulario de reunión y por WhatsApp, y en sus asistentes de WhatsApp con IA; retención, eliminación de datos y cómo ejercer tus derechos.',
      path: '/politica-de-privacidad',
    });
  }

  public ngOnDestroy(): void {
    this.seo.restore();
  }
}
