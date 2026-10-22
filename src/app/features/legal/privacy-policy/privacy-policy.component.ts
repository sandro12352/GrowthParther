import { Component, OnDestroy, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowLeft } from '@ng-icons/lucide';
import { CONTACT_EMAIL, WHATSAPP_NUMBER, whatsappUrl } from '../../../core/contact.config';
import { RevealDirective } from '../../../core/reveal.directive';
import { SeoService } from '../../../core/seo.service';

interface Section {
  title: string;
  paragraphs?: string[];
  items?: string[];
}

/**
 * Política de privacidad. Texto general redactado para la web actual (formulario de reunión guardado en Google Sheets,
 * aviso por correo, chat de WhatsApp, sin cookies de analítica ni publicidad). Si cambia algo de eso, hay que actualizarla.
 */
@Component({
  selector: 'app-privacy-policy',
  imports: [RouterLink, NgIcon, RevealDirective],
  providers: [provideIcons({ lucideArrowLeft })],
  template: `
    <section class="relative overflow-hidden bg-[#130735] pb-20 pt-36 text-white lg:pb-24 lg:pt-44">
      <div class="pointer-events-none absolute inset-0 overflow-hidden">
        <div class="absolute left-1/2 top-1/4 h-[420px] w-[620px] -translate-x-1/2 rounded-full bg-[#6C5CE7]/20 blur-[120px]"></div>
      </div>
      <div appReveal revealStagger class="relative mx-auto max-w-4xl px-6">
        <a routerLink="/" class="inline-flex items-center gap-2 text-sm font-medium text-white/70 transition hover:text-white">
          <ng-icon name="lucideArrowLeft" size="16" />
          Volver al inicio
        </a>
        <h1 class="mt-8 text-balance text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl">Política de privacidad</h1>
        <p class="mt-5 max-w-3xl text-base leading-7 text-white/75 md:text-lg">
          Cómo tratamos los datos personales de quienes nos contactan a través de esta web, del formulario de reunión o de WhatsApp.
        </p>
        <p class="mt-4 text-sm text-white/60">Última actualización: {{ updated }}</p>
      </div>
    </section>

    <article class="bg-white py-16 lg:py-24">
      <div class="mx-auto max-w-3xl px-6">
        @for (section of sections; track section.title; let i = $index) {
        <section class="mt-12 first:mt-0">
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

        <section class="mt-12 rounded-2xl border border-black/10 bg-[#f7f7fa] p-6">
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
      </div>
    </article>
  `,
})
export class PrivacyPolicyComponent implements OnDestroy {
  private readonly seo = inject(SeoService);

  protected readonly updated = '22 de octubre de 2026';
  protected readonly email = CONTACT_EMAIL;
  protected readonly whatsapp = whatsappUrl('Hola, tengo una consulta sobre mis datos personales.');
  protected readonly phone = WHATSAPP_NUMBER ? `+${WHATSAPP_NUMBER.slice(0, 2)} ${WHATSAPP_NUMBER.slice(2, 5)} ${WHATSAPP_NUMBER.slice(5, 8)} ${WHATSAPP_NUMBER.slice(8)}` : '';

  protected readonly sections: Section[] = [
    {
      title: 'Quiénes somos',
      paragraphs: [
        'GrowthProject AI (en adelante, «nosotros») ofrece servicios de automatización de procesos, inteligencia artificial, CRM e integración de herramientas digitales. Esta web es www.growthprojectai.com.',
        'Somos el responsable del tratamiento de los datos personales que nos facilitas a través de esta web, del formulario de reunión o de WhatsApp, conforme a la Ley N.º 29733, Ley de Protección de Datos Personales de Perú, y su reglamento.',
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
      title: 'Para qué usamos tus datos',
      items: [
        'Responder tu consulta y coordinar la reunión que solicitas.',
        'Contactarte por el medio que nos indicas para darte información sobre nuestros servicios.',
        'Mantener un registro interno de las solicitudes recibidas.',
        'Mejorar la web y nuestra atención.',
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
        'Conservamos tus datos mientras dure la gestión de tu solicitud o la relación comercial con nosotros, y hasta que nos pidas su eliminación.',
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
      title: 'Seguridad',
      paragraphs: [
        'Aplicamos medidas razonables para proteger tus datos, como el acceso restringido a la hoja de cálculo donde se guardan. Ningún sistema es completamente infalible, pero trabajamos para reducir los riesgos.',
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
        'Cómo GrowthProject AI trata los datos personales que recibe por el formulario de reunión y por WhatsApp, y cómo ejercer tus derechos.',
      path: '/politica-de-privacidad',
    });
  }

  public ngOnDestroy(): void {
    this.seo.restore();
  }
}
