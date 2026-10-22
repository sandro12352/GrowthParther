import { Component, OnDestroy, inject, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideArrowRight,
  lucideBot,
  lucideCheck,
  lucideClipboardList,
  lucideHandshake,
  lucideHourglass,
  lucideLayers,
  lucideMessageCircle,
  lucideRepeat,
  lucideSparkles,
  lucideUserRoundCheck,
  lucideWorkflow,
} from '@ng-icons/lucide';
import { RevealDirective } from '../../../core/reveal.directive';
import { SeoService } from '../../../core/seo.service';
import { SequenceDirective } from '../../../core/sequence.directive';
import { MeetingDialogService } from '../../../shared/components/services/meeting-dialog.service';
import { PageClosingComponent } from '../../../shared/page-closing/page-closing.component';
import { RelatedPostsComponent } from '../../../shared/related-posts/related-posts.component';
import { PageContent } from '../../../shared/models/page-content.model';

/** Página «IA para empresas»: diseño propio (conversación, pestañas de capacidades, reparto IA / equipo). */
const CONTENT: PageContent = {
  path: 'ia-para-empresas',
  draft: false,

  seo: {
    title: 'IA para empresas: agentes y chatbots | GrowthProject AI',
    description:
      'Agentes de inteligencia artificial que atienden conversaciones, recopilan datos y califican prospectos, con tu equipo interviniendo cuando hace falta.',
  },

  hero: {
    eyebrow: 'Soluciones · IA para empresas',
    title: 'Inteligencia artificial',
    accent: 'que trabaja junto a tu equipo.',
    subtitle:
      'La IA se encarga de las tareas repetitivas, responde conversaciones y recopila información. Tu equipo interviene cuando el proceso necesita atención humana.',
    cta: 'Solicitar reunión',
    // PROVISIONAL: ejemplo ilustrativo a partir de lo que ya muestra el home.
    flow: [
      { icon: 'lucideMessageCircle', title: 'Llega una conversación', text: 'Por cualquiera de tus canales' },
      { icon: 'lucideBot', title: 'La IA atiende', text: 'Entiende y responde' },
      { icon: 'lucideClipboardList', title: 'Recopila información', text: 'Datos del prospecto' },
      { icon: 'lucideHandshake', title: 'Tu equipo interviene', text: 'Cuando hace falta una persona' },
    ],
  },

  // PROVISIONAL: redacción genérica; sustituir por la del equipo.
  problem: {
    eyebrow: 'El problema',
    title: 'Tu equipo no debería responder lo mismo todos los días',
    intro: 'Atender cada conversación a mano limita cuánto puede crecer tu operación.',
    items: [
      {
        title: 'Preguntas repetidas',
        text: 'Las mismas consultas llegan una y otra vez y alguien tiene que contestarlas.',
      },
      {
        title: 'Datos incompletos',
        text: 'La información del prospecto queda en la conversación y no llega ordenada al CRM.',
      },
      {
        title: 'Respuestas tardías',
        text: 'Cuando nadie está disponible, el prospecto espera y puede perder el interés.',
      },
    ],
  },

  // Textos basados en el home y en la respuesta del FAQ sobre IA.
  scope: {
    eyebrow: 'Qué puede hacer la IA',
    title: 'Una IA que se encarga de lo repetitivo',
    accent: 'y deja lo importante a tu equipo.',
    intro: 'Estas son algunas de las tareas que puede asumir dentro de tu proceso.',
    items: [
      { icon: 'lucideBot', title: 'Atender la conversación', text: 'Atiende y entiende la conversación con cada prospecto.' },
      { icon: 'lucideMessageCircle', title: 'Responder mensajes', text: 'Automatiza respuestas y atención inicial en tus canales digitales.' },
      { icon: 'lucideClipboardList', title: 'Recopilar información', text: 'Reúne los datos que necesitas de cada contacto durante la conversación.' },
      { icon: 'lucideUserRoundCheck', title: 'Calificar prospectos', text: 'Identifica automáticamente qué contactos tienen mayor potencial.' },
      { icon: 'lucideWorkflow', title: 'Ejecutar procesos definidos', text: 'Sigue los pasos que definimos contigo, de forma consistente.' },
      { icon: 'lucideHandshake', title: 'Pasar a una persona', text: 'Tu equipo interviene cuando el proceso necesita atención humana o una decisión comercial.' },
    ],
  },

  // PROVISIONAL: conversación ilustrativa, no es un caso real.
  chat: [
    { from: 'client', text: 'Hola, quisiera más información.' },
    { from: 'ai', text: '¡Hola! Con gusto te ayudo. ¿Qué estás buscando?' },
    { from: 'client', text: 'Me interesa conocer sus servicios.' },
    { from: 'ai', text: 'Perfecto. Te hago un par de preguntas y coordino con nuestro equipo.' },
  ],

  // Basado en la respuesta del FAQ: «¿La inteligencia artificial reemplaza a mi equipo comercial?».
  handoff: {
    ai: {
      title: 'La IA se encarga de',
      items: ['Tareas repetitivas', 'Responder conversaciones', 'Recopilar información', 'Ejecutar procesos definidos'],
    },
    team: {
      title: 'Tu equipo interviene en',
      items: ['Procesos que necesitan atención humana', 'Decisiones comerciales'],
    },
  },

  // Los tres primeros pasos salen del FAQ del home; el cuarto es PROVISIONAL.
  steps: {
    eyebrow: 'Cómo trabajamos',
    title: 'De tu proceso actual a un asistente que lo sigue',
    intro: 'Así empieza un proyecto con inteligencia artificial.',
    items: [
      {
        title: 'Analizamos tu proceso actual',
        text: 'Revisamos cómo funciona hoy: captación, atención, seguimiento y herramientas.',
      },
      {
        title: 'Definimos qué hace la IA',
        text: 'Identificamos qué tareas puede asumir y cuándo debe intervenir una persona.',
      },
      {
        title: 'Diseñamos el sistema',
        text: 'Construimos el sistema que mejor se adapte a tu operación, conectado a las herramientas que ya usas.',
      },
      {
        title: 'Probamos y acompañamos',
        text: 'Probamos el asistente antes de activarlo. El tiempo estimado es de 5 a 7 días. Después tienes soporte técnico en el horario acordado y tu asistente sigue funcionando 24/7.',
      },
    ],
  },

  faqs: [
    {
      question: '¿La inteligencia artificial reemplaza a mi equipo comercial?',
      answer:
        'La IA puede encargarse de determinadas tareas repetitivas, responder conversaciones, recopilar información y ejecutar procesos definidos. El equipo puede intervenir cuando el proceso necesita atención humana o una decisión comercial.',
    },
    {
      question: '¿Pueden conectar las herramientas que ya utiliza mi empresa?',
      answer:
        'Sí. Evaluamos las herramientas que utilizas actualmente y, cuando existen las integraciones o conexiones necesarias, podemos incorporarlas dentro del flujo de automatización.',
    },
    {
      question: '¿Trabajan con WhatsApp?',
      answer:
        'Sí. Podemos trabajar flujos donde WhatsApp forme parte de la captación, atención, seguimiento, calificación y comunicación automática con tus prospectos o clientes.',
    },
    {
      question: '¿Cuánto tarda en estar funcionando?',
      answer:
        'El tiempo estimado es de 5 a 7 días. Si necesitas algo más personalizado, el plazo se define contigo.',
    },
    {
      question: '¿Hay soporte si algo falla?',
      answer: 'Sí. Tienes soporte técnico en el horario acordado, y tu asistente sigue funcionando 24/7.',
    },
  ],

  cta: {
    title: '¿Qué conversaciones quieres dejar de atender a mano?',
    text: 'Cuéntanos tu proceso y vemos juntos qué puede hacer la IA por tu equipo.',
    button: 'Solicitar reunión',
  },

  relatedPosts: ['ia-atencion-clientes', 'whatsapp-automatizado', 'procesos-automatizar'],
  related: [
    { label: 'Automatización de procesos', path: '/automatizacion' },
    { label: 'CRM', path: '/crm' },
    { label: 'Integraciones', path: '/integraciones' },
  ],
};

@Component({
  selector: 'app-ai-for-business',
  imports: [NgIcon, RevealDirective, SequenceDirective, PageClosingComponent, RelatedPostsComponent],
  providers: [
    provideIcons({
      lucideArrowRight,
      lucideBot,
      lucideCheck,
      lucideClipboardList,
      lucideHandshake,
      lucideHourglass,
      lucideLayers,
      lucideMessageCircle,
      lucideRepeat,
      lucideSparkles,
      lucideUserRoundCheck,
      lucideWorkflow,
    }),
  ],
  templateUrl: './ai-for-business.component.html',
})
export class AiForBusinessComponent implements OnDestroy {
  private readonly seo = inject(SeoService);
  private readonly meetingDialogService = inject(MeetingDialogService);

  public readonly page: PageContent = CONTENT;

  public readonly related = this.page.related;

  public readonly problemIcons = ['lucideRepeat', 'lucideLayers', 'lucideHourglass'];

  /** Iconos de las listas de «IA y tu equipo», en el orden de los textos. */
  public readonly aiIcons = ['lucideRepeat', 'lucideMessageCircle', 'lucideClipboardList', 'lucideWorkflow'];
  public readonly teamIcons = ['lucideUserRoundCheck', 'lucideHandshake'];

  /** Imagen de cada capacidad (mismo orden que scope.items), dibujadas con texto real en public/ia/. */
  public readonly sceneImages = [
    { src: '/ia/atender.webp', width: 1500, height: 1060, alt: 'Chat en el que la IA atiende a un cliente y le reserva una cita para el sábado' },
    { src: '/ia/responder.webp', width: 1500, height: 1060, alt: 'Bandeja de entrada con tres conversaciones de distintos canales respondidas automáticamente por la IA' },
    { src: '/ia/recopilar.webp', width: 1500, height: 1060, alt: 'Conversación con la IA y la ficha del contacto con sus datos ya recopilados' },
    { src: '/ia/calificar.webp', width: 1500, height: 1060, alt: 'Lista de prospectos calificados como alto, medio y bajo potencial, con el motivo de cada uno' },
    { src: '/ia/procesos.webp', width: 1500, height: 1060, alt: 'Flujo automático que atiende un mensaje, decide si agenda una reunión o envía información, y lo registra en el CRM' },
    { src: '/ia/persona.webp', width: 1500, height: 1060, alt: 'La IA deriva la conversación a un asesor, que recibe una notificación con el resumen' },
  ];

  /** Capacidad seleccionada en las pestañas. */
  public readonly active = signal(0);

  constructor() {
    this.seo.apply({
      title: this.page.seo.title,
      description: this.page.seo.description,
      path: `/${this.page.path}`,
      noindex: this.page.draft,
    });
  }

  public openMeetingDialog(): void {
    this.meetingDialogService.requestOpen();
  }

  public ngOnDestroy(): void {
    this.seo.restore();
  }
}
