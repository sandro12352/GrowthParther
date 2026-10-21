import { Component, ElementRef, OnDestroy, inject, signal, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideArrowRight,
  lucideBellRing,
  lucideBot,
  lucideCalendarCheck,
  lucideCheck,
  lucideClipboardList,
  lucideDatabase,
  lucideMail,
  lucideMaximize2,
  lucideMessageCircle,
  lucidePlus,
  lucideHandshake,
  lucideHourglass,
  lucideLayers,
  lucideListChecks,
  lucideRefreshCw,
  lucideRepeat,
  lucideRocket,
  lucideSearch,
  lucideWorkflow,
  lucideRotateCcw,
  lucideSparkles,
  lucideUserRoundCheck,
  lucideUsersRound,
  lucideX,
} from '@ng-icons/lucide';
import { RevealDirective } from '../../../core/reveal.directive';
import { SeoService } from '../../../core/seo.service';
import { SequenceDirective } from '../../../core/sequence.directive';
import { MeetingDialogService } from '../../../shared/components/services/meeting-dialog.service';
import { PageClosingComponent } from '../../../shared/page-closing/page-closing.component';
import { RelatedPostsComponent } from '../../../shared/related-posts/related-posts.component';
import { PageContent } from '../../../shared/models/page-content.model';

const CONTENT: PageContent = {
  path: 'automatizacion',
  draft: false,

  seo: {
    title: 'Automatización de procesos para empresas | GrowthProject AI',
    description:
      'Automatizamos respuestas, seguimiento, agendamiento y actualización del CRM con flujos a medida. Implementación estimada de 5 a 7 días y soporte 24/7.',
  },

  hero: {
    eyebrow: 'Soluciones · Automatización de procesos',
    title: 'Automatización de procesos',
    accent: 'a la medida de tu negocio.',
    subtitle:
      'Diseñamos flujos personalizados que conectan tus canales, CRM, inteligencia artificial y procesos para que tu equipo deje de hacer tareas repetitivas.',
    cta: 'Solicitar reunión',
    // PROVISIONAL: ejemplo ilustrativo del recorrido de un lead, a partir de lo que ya muestra el home.
    flow: [
      { icon: 'lucideMessageCircle', title: 'Mensaje recibido', text: 'WhatsApp, Instagram o Facebook' },
      { icon: 'lucideBot', title: 'La IA responde', text: 'Atención automática' },
      { icon: 'lucideUserRoundCheck', title: 'Lead calificado', text: 'Datos al CRM' },
      { icon: 'lucideCalendarCheck', title: 'Reunión agendada', text: 'Sin pasos manuales' },
    ],
  },

  // PROVISIONAL: redacción genérica a partir de lo que ya dice la web; sustituir por la del equipo.
  problem: {
    eyebrow: 'El problema',
    title: 'Cuando todo se hace a mano, el equipo no avanza',
    intro:
      'Muchas empresas dependen de tareas repetitivas y de información repartida en varias herramientas. Es lo que solemos encontrar al empezar.',
    items: [
      {
        title: 'Tareas repetitivas',
        text: 'Respuestas, recordatorios y seguimientos que alguien tiene que hacer todos los días.',
      },
      {
        title: 'Información dispersa',
        text: 'Datos de clientes en distintos canales y herramientas, sin un solo lugar donde verlos.',
      },
      {
        title: 'Oportunidades sin seguimiento',
        text: 'Prospectos que se enfrían porque nadie los retoma a tiempo.',
      },
    ],
  },

  // Textos reales: son las tareas de la sección "Menos trabajo manual" del home.
  scope: {
    eyebrow: 'Qué automatizamos',
    title: 'Si una tarea se repite todos los días,',
    accent: 'probablemente podamos automatizarla.',
    intro: 'Estas son algunas de las tareas que convertimos en procesos automáticos.',
    items: [
      { icon: 'lucideMessageCircle', title: 'Responder mensajes', text: 'Automatiza respuestas y atención inicial en tus canales digitales.' },
      { icon: 'lucideRefreshCw', title: 'Dar seguimiento', text: 'Envía recordatorios y seguimientos sin depender de que alguien los haga manualmente.' },
      { icon: 'lucideCalendarCheck', title: 'Agendar reuniones', text: 'Permite que tus prospectos agenden citas automáticamente.' },
      { icon: 'lucideUserRoundCheck', title: 'Calificar prospectos', text: 'Identifica automáticamente qué contactos tienen mayor potencial.' },
      { icon: 'lucideDatabase', title: 'Actualizar el CRM', text: 'Centraliza información, etiquetas, oportunidades y tareas automáticamente.' },
      { icon: 'lucideRotateCcw', title: 'Reactivar prospectos', text: 'Recupera conversaciones y oportunidades que quedaron sin respuesta.' },
      { icon: 'lucideMail', title: 'Enviar campañas', text: 'Crea secuencias de comunicación según el comportamiento de cada contacto.' },
      { icon: 'lucideUsersRound', title: 'Distribuir leads', text: 'Asigna automáticamente los prospectos al asesor o equipo correspondiente.' },
      { icon: 'lucideBellRing', title: 'Enviar recordatorios', text: 'Reduce ausencias y mantén a tus clientes informados automáticamente.' },
    ],
  },

  // Los tres primeros pasos salen de la respuesta "¿Cómo empieza un proyecto?" del FAQ; el cuarto es PROVISIONAL.
  steps: {
    eyebrow: 'Cómo trabajamos',
    title: 'Del proceso actual al sistema automatizado',
    intro: 'Así empieza un proyecto de automatización.',
    items: [
      {
        title: 'Analizamos tu proceso actual',
        text: 'Revisamos cómo funciona hoy: captación, atención, seguimiento y herramientas.',
      },
      {
        title: 'Identificamos qué automatizar',
        text: 'Definimos qué tareas pueden automatizarse y cuáles conviene que siga haciendo una persona.',
      },
      {
        title: 'Diseñamos el sistema',
        text: 'Construimos el sistema que mejor se adapte a tu operación, conectado a las herramientas que ya usas.',
      },
      {
        title: 'Probamos y acompañamos',
        text: 'Probamos el flujo antes de activarlo. El tiempo estimado es de 5 a 7 días y después cuentas con soporte 24/7.',
      },
    ],
  },

  // Caso real de la web (sección Workflows del home).
  caseStudy: {
    eyebrow: 'Un ejemplo real',
    title: 'Así se ve un proceso automatizado',
    name: 'GRIN',
    description:
      'Automatización del proceso de pedidos y seguimiento desde el primer contacto hasta las diferentes condiciones del proceso.',
    tags: ['WhatsApp', 'Condiciones', 'Seguimiento'],
    image: '/flujos/grin.webp',
    alt: 'Workflow de automatización GRIN',
    width: 1919,
    height: 941,
  },

  // Respuestas reales del FAQ del home.
  faqs: [
    {
      question: '¿Qué tipo de procesos pueden automatizar?',
      answer:
        'Podemos automatizar tareas repetitivas relacionadas con captación de leads, respuestas, seguimiento, calificación, actualización del CRM, agendamiento, recordatorios, reactivación y comunicación.',
    },
    {
      question: '¿Pueden conectar las herramientas que ya utiliza mi empresa?',
      answer:
        'Sí. Evaluamos las herramientas que utilizas actualmente y, cuando existen las integraciones o conexiones necesarias, podemos incorporarlas dentro del flujo de automatización.',
    },
    {
      question: '¿Cómo empieza un proyecto de automatización?',
      answer:
        'Primero analizamos cómo funciona actualmente tu proceso: captación, atención, seguimiento y herramientas. A partir de ahí identificamos qué tareas pueden automatizarse y diseñamos el sistema que mejor se adapte a tu operación.',
    },
    {
      question: '¿Cuánto tarda la implementación?',
      answer:
        'El tiempo estimado es de 5 a 7 días. Si necesitas algo más personalizado, el plazo se define contigo.',
    },
    {
      question: '¿Tienen soporte después de la puesta en marcha?',
      answer: 'Sí. Contamos con soporte 24/7 para que tu automatización siga funcionando con normalidad.',
    },
  ],

  cta: {
    title: '¿Qué quieres dejar de hacer manualmente?',
    text: 'Cuéntanos tu proceso y vemos juntos cómo automatizarlo.',
    button: 'Solicitar reunión',
  },

  relatedPosts: ['procesos-automatizar', 'integraciones', 'sistema-seguimiento'],
  related: [
    { label: 'IA para empresas', path: '/ia-para-empresas' },
    { label: 'CRM', path: '/crm' },
    { label: 'Integraciones', path: '/integraciones' },
  ],
};

/**
 * Plantilla de las páginas de servicios. Toda la información sale de `pages.data.ts`:
 * esta clase solo busca la página que corresponde a la ruta y se la pasa a la plantilla.
 */
@Component({
  selector: 'app-automation',
  imports: [NgIcon, RouterLink, RevealDirective, SequenceDirective, PageClosingComponent, RelatedPostsComponent],
  providers: [
    provideIcons({
      lucideArrowRight,
      lucideBellRing,
      lucideBot,
      lucideCalendarCheck,
      lucideCheck,
      lucideClipboardList,
      lucideHandshake,
      lucideDatabase,
      lucideMail,
      lucideMaximize2,
      lucideMessageCircle,
      lucidePlus,
      lucideHourglass,
      lucideLayers,
      lucideListChecks,
      lucideRepeat,
      lucideRefreshCw,
      lucideRocket,
      lucideSearch,
      lucideWorkflow,
      lucideRotateCcw,
      lucideSparkles,
      lucideUserRoundCheck,
      lucideUsersRound,
      lucideX,
    }),
  ],
  templateUrl: './automation.component.html',
})
export class AutomationComponent implements OnDestroy {
  private readonly seo = inject(SeoService);
  private readonly meetingDialogService = inject(MeetingDialogService);

  private readonly viewer = viewChild<ElementRef<HTMLDialogElement>>('viewer');

  public readonly page: PageContent = CONTENT;

  /** Solo se enlazan las páginas relacionadas que ya existen. */
  public readonly related = this.page.related;

  /** Icono de cada tarjeta de «El problema», en orden. */
  public readonly problemIcons = ['lucideRepeat', 'lucideLayers', 'lucideHourglass'];

  /** Icono de cada paso de «Cómo trabajamos», en orden. */
  public readonly stepIcons = ['lucideSearch', 'lucideListChecks', 'lucideWorkflow', 'lucideRocket'];

  /** true mientras el visor de la captura del caso está abierto. */
  public readonly viewing = signal(false);

  constructor() {
    this.seo.apply({
      title: this.page.seo.title,
      description: this.page.seo.description,
      path: `/${this.page.path}`,
      noindex: this.page.draft,
    });
  }

  /** Alterna el color de los iconos (violeta y cian) como en el resto de la web. */
  public iconTone(index: number): string {
    return index % 2 === 0 ? 'bg-[#6C5CE7]/15 text-[#B9AFFF]' : 'bg-[#00F2FE]/10 text-[#00F2FE]';
  }

  public openMeetingDialog(): void {
    this.meetingDialogService.requestOpen();
  }

  public openViewer(): void {
    this.viewing.set(true);
    this.viewer()?.nativeElement.showModal();
  }

  public closeViewer(): void {
    this.viewer()?.nativeElement.close();
  }

  public onViewerClosed(): void {
    this.viewing.set(false);
  }

  public onViewerClick(event: MouseEvent): void {
    // Un clic directo sobre el <dialog> (no sobre su contenido) es un clic en el fondo.
    if (event.target === this.viewer()?.nativeElement) {
      this.closeViewer();
    }
  }

  public ngOnDestroy(): void {
    this.seo.restore();
  }
}
