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
import { PageContent } from '../../../shared/models/page-content.model';

/** Página «IA para empresas»: diseño propio (conversación, pestañas de capacidades, reparto IA / equipo). */
const CONTENT: PageContent = {
  path: 'ia-para-empresas',
  draft: true,

  seo: {
    title: 'IA para empresas | GrowthProject AI',
    description:
      'Asistentes de inteligencia artificial que atienden conversaciones, recopilan información y ejecutan procesos definidos, con tu equipo interviniendo cuando hace falta.',
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
        text: 'PROVISIONAL · Por definir con el equipo: pruebas, puesta en marcha y soporte posterior.',
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
  ],

  cta: {
    title: '¿Qué conversaciones quieres dejar de atender a mano?',
    text: 'Cuéntanos tu proceso y vemos juntos qué puede hacer la IA por tu equipo.',
    button: 'Solicitar reunión',
  },

  related: [
    { label: 'Automatización de procesos', path: '/automatizacion' },
    { label: 'CRM', path: '/crm' },
    { label: 'Integraciones', path: '/integraciones' },
  ],
};

@Component({
  selector: 'app-ai-for-business',
  imports: [NgIcon, RevealDirective, SequenceDirective, PageClosingComponent],
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
