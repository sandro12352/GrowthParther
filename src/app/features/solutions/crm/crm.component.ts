import { Component, OnDestroy, inject } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideArrowRight,
  lucideHourglass,
  lucideLayers,
  lucideMessageCircle,
  lucideRefreshCw,
  lucideRoute,
  lucideSparkles,
  lucideTags,
  lucideTarget,
  lucideUsersRound,
} from '@ng-icons/lucide';
import { RevealDirective } from '../../../core/reveal.directive';
import { SeoService } from '../../../core/seo.service';
import { SequenceDirective } from '../../../core/sequence.directive';
import { MeetingDialogService } from '../../../shared/components/services/meeting-dialog.service';
import { PageClosingComponent } from '../../../shared/page-closing/page-closing.component';
import { RelatedPostsComponent } from '../../../shared/related-posts/related-posts.component';
import { PageContent } from '../../../shared/models/page-content.model';

/** Página «CRM»: diseño propio (tablero de oportunidades, lista editorial, línea de tiempo en zigzag). */
const CONTENT: PageContent = {
  path: 'crm',
  draft: false,

  seo: {
    title: 'CRM y automatización de leads | GrowthProject AI',
    description:
      'Centraliza leads, conversaciones y oportunidades en un CRM conectado a tus canales, a la IA y a tus automatizaciones. Trabajamos con GoHighLevel.',
  },

  hero: {
    eyebrow: 'Soluciones · CRM',
    title: 'Un CRM conectado',
    accent: 'a tus canales y automatizaciones.',
    subtitle:
      'Centraliza leads, conversaciones, oportunidades y seguimiento en un solo lugar, conectado a tus canales, a la inteligencia artificial y a tus procesos.',
    cta: 'Solicitar reunión',
  },

  // PROVISIONAL: etapas y contactos INVENTADOS, solo para ilustrar el tablero. Sustituir o dejar como ejemplo.
  board: [
    {
      title: 'Nuevo',
      cards: [
        { name: 'Carolina Vega', note: 'Consulta por servicios', tag: 'WhatsApp' },
        { name: 'Diego Paredes', note: 'Pide una cotización', tag: 'Instagram' },
        { name: 'Lucía Ramos', note: 'Quiere más información', tag: 'Facebook' },
      ],
    },
    {
      title: 'En conversación',
      cards: [
        { name: 'Marco Salazar', note: 'Evalúa opciones', tag: 'WhatsApp' },
        { name: 'Andrea Quispe', note: 'Resuelve dudas', tag: 'Email' },
      ],
    },
    {
      title: 'Calificado',
      cards: [
        { name: 'Valeria Castro', note: 'Alto potencial', tag: 'WhatsApp' },
        { name: 'Javier Núñez', note: 'Listo para reunión', tag: 'Instagram' },
      ],
    },
    {
      title: 'Reunión agendada',
      cards: [{ name: 'Sofía Mendoza', note: 'Jueves · 10:00', tag: 'WhatsApp' }],
    },
  ],

  // Canales reales: los del diagrama del home.
  channels: ['WhatsApp', 'Instagram', 'Facebook', 'TikTok', 'Email', 'SMS'],

  // PROVISIONAL: redacción genérica; sustituir por la del equipo.
  problem: {
    eyebrow: 'El problema',
    title: 'Cuando la información está dispersa, se pierden oportunidades',
    intro: 'Es lo que solemos encontrar cuando los datos de los clientes viven en varios lugares.',
    items: [
      {
        title: 'Leads en varios lugares',
        text: 'Contactos repartidos entre chats, hojas de cálculo y correos, sin una sola vista.',
      },
      {
        title: 'Conversaciones sin contexto',
        text: 'Cada persona que atiende parte de cero porque no ve qué se habló antes.',
      },
      {
        title: 'Oportunidades sin seguimiento',
        text: 'Prospectos que se enfrían porque nadie sabe en qué etapa están ni quién debe retomarlos.',
      },
    ],
  },

  // Los nombres salen del FAQ y del home; las descripciones de los cuatro primeros son PROVISIONALES.
  scope: {
    eyebrow: 'Qué centraliza',
    title: 'Todo lo comercial,',
    accent: 'en un solo lugar.',
    intro: 'Un sistema centralizado para gestionar tu proceso comercial de principio a fin.',
    items: [
      { icon: 'lucideUsersRound', title: 'Leads', text: 'Reúne los contactos que llegan desde todos tus canales.' },
      { icon: 'lucideMessageCircle', title: 'Conversaciones', text: 'Guarda el historial de cada conversación junto al contacto.' },
      { icon: 'lucideTarget', title: 'Oportunidades', text: 'Muestra en qué etapa está cada oportunidad comercial.' },
      { icon: 'lucideRefreshCw', title: 'Seguimiento', text: 'Mantiene visibles las tareas y los próximos pasos con cada contacto.' },
      { icon: 'lucideTags', title: 'Etiquetas y tareas', text: 'Centraliza información, etiquetas, oportunidades y tareas automáticamente.' },
      { icon: 'lucideRoute', title: 'Asignación de leads', text: 'Asigna automáticamente los prospectos al asesor o equipo correspondiente.' },
    ],
  },

  // Los primeros pasos salen del FAQ del home; el último es PROVISIONAL.
  steps: {
    eyebrow: 'Cómo trabajamos',
    title: 'De información dispersa a un sistema centralizado',
    intro: 'Así empieza un proyecto de CRM.',
    items: [
      {
        title: 'Analizamos tu proceso actual',
        text: 'Revisamos cómo funciona hoy: captación, atención, seguimiento y herramientas.',
      },
      {
        title: 'Definimos el sistema',
        text: 'Trabajamos sobre las herramientas que ya utilizas o te ayudamos a estructurar un sistema centralizado.',
      },
      {
        title: 'Conectamos canales y automatizaciones',
        text: 'Integramos tus canales y los flujos para que la información llegue sola al CRM.',
      },
      {
        title: 'Probamos y acompañamos',
        text: 'Probamos todo antes de activarlo. El tiempo estimado es de 5 a 7 días y después cuentas con soporte 24/7.',
      },
    ],
  },

  // Respuestas reales del FAQ del home.
  faqs: [
    {
      question: '¿Necesito tener un CRM para trabajar con ustedes?',
      answer:
        'No necesariamente. Podemos trabajar sobre herramientas que ya utilizas o ayudarte a estructurar un sistema centralizado para gestionar leads, conversaciones, oportunidades y seguimiento.',
    },
    {
      question: '¿Trabajan con GoHighLevel?',
      answer:
        'Sí. Podemos trabajar con GoHighLevel para estructurar CRM, workflows, automatizaciones, conversaciones, seguimiento, oportunidades y diferentes procesos comerciales.',
    },
    {
      question: '¿Pueden conectar las herramientas que ya utiliza mi empresa?',
      answer:
        'Sí. Evaluamos las herramientas que utilizas actualmente y, cuando existen las integraciones o conexiones necesarias, podemos incorporarlas dentro del flujo de automatización.',
    },
    {
      question: '¿Cuánto tarda la implementación?',
      answer:
        'El tiempo estimado es de 5 a 7 días. Si necesitas algo más personalizado, el plazo se define contigo.',
    },
    {
      question: '¿Tienen soporte?',
      answer: 'Sí. Contamos con soporte 24/7.',
    },
  ],

  cta: {
    title: '¿Cómo gestionas hoy tus leads?',
    text: 'Cuéntanos cómo trabajas y vemos juntos cómo centralizarlo.',
    button: 'Solicitar reunión',
  },

  relatedPosts: ['crm-seguimiento', 'sistema-seguimiento', 'integraciones'],
  related: [
    { label: 'Automatización de procesos', path: '/automatizacion' },
    { label: 'IA para empresas', path: '/ia-para-empresas' },
    { label: 'Integraciones', path: '/integraciones' },
  ],
};

@Component({
  selector: 'app-crm',
  imports: [NgIcon, RevealDirective, SequenceDirective, PageClosingComponent, RelatedPostsComponent],
  providers: [
    provideIcons({
      lucideArrowRight,
      lucideHourglass,
      lucideLayers,
      lucideMessageCircle,
      lucideRefreshCw,
      lucideRoute,
      lucideSparkles,
      lucideTags,
      lucideTarget,
      lucideUsersRound,
    }),
  ],
  templateUrl: './crm.component.html',
})
export class CrmComponent implements OnDestroy {
  private readonly seo = inject(SeoService);
  private readonly meetingDialogService = inject(MeetingDialogService);

  public readonly page: PageContent = CONTENT;

  public readonly related = this.page.related;

  public readonly problemIcons = ['lucideLayers', 'lucideMessageCircle', 'lucideHourglass'];

  constructor() {
    this.seo.apply({
      title: this.page.seo.title,
      description: this.page.seo.description,
      path: `/${this.page.path}`,
      noindex: this.page.draft,
    });
  }

  /** Iniciales para el avatar: «Carolina Vega» → «CV». */
  public initials(name: string): string {
    return name
      .split(' ')
      .slice(0, 2)
      .map((word) => word[0])
      .join('');
  }

  public openMeetingDialog(): void {
    this.meetingDialogService.requestOpen();
  }

  public ngOnDestroy(): void {
    this.seo.restore();
  }
}
