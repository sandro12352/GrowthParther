import { AfterViewInit, Component, ElementRef, OnDestroy, PLATFORM_ID, ViewChild, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowRight, lucideArrowUpRight, lucideBellRing, lucideBot, lucideBrainCircuit, lucideCalendar, lucideCalendarCheck, lucideCalendarDays, lucideChartNoAxesCombined, lucideCheck, lucideClipboardList, lucideClock3, lucideCreditCard, lucideDatabase, lucideFilter, lucideMessagesSquare, lucideSend, lucideLink, lucideMail, lucideMessageCircle, lucideMessageSquare, lucideMusic2, lucidePlay, lucidePlus, lucideRefreshCw, lucideRotateCcw, lucideSettings2, lucideShare2, lucideSmartphone, lucideSparkles, lucideStar, lucideUserPlus, lucideUserRoundCheck, lucideUsers, lucideUsersRound, lucideWebhook, lucideWorkflow, lucideZap } from '@ng-icons/lucide';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmCarouselImports } from '@spartan-ng/helm/carousel';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import AutoScroll from 'embla-carousel-auto-scroll'
import { RevealDirective } from '../../core/reveal.directive';
import { DrawPathsDirective } from '../../core/draw-paths.directive';
import { HeroIntroDirective } from '../../core/hero-intro.directive';
import { WorkflowsComponent } from './workflows/workflows.component';
import { NetworkBgComponent } from '../../shared/network-bg/network-bg.component';
import { POSTS, formatPostDate, postImage } from '../blog/blog.data';
import { PLANS } from '../plans/plans.data';
import { PlanCardComponent } from '../plans/plan-card/plan-card.component';
import { MeetingDialogService } from '../../shared/components/services/meeting-dialog.service';
import { SeoService } from '../../core/seo.service';

@Component({
  imports: [
    NgIcon,
    RouterLink,
    ReactiveFormsModule,
    HlmButtonImports,
    HlmCarouselImports,
    HlmCardImports,
    HlmInputImports,
    WorkflowsComponent,
    PlanCardComponent,
    NetworkBgComponent,
    RevealDirective,
    DrawPathsDirective,
    HeroIntroDirective,
  ],
  providers: [provideIcons({
    lucideUsers,
    lucideChartNoAxesCombined,
    lucideClock3,
    lucideSettings2,
    lucideArrowRight,
    lucideMessageCircle,
    lucideSend,
    lucideMessagesSquare,
    lucidePlay,
    lucideMail,
    lucideSmartphone,
    lucideBot,
    lucideDatabase,
    lucideWorkflow,
    lucideFilter,
    lucideRefreshCw,
    lucideCalendarDays,
    lucideClipboardList,
    lucideCreditCard,
    lucideStar,
    lucideShare2,
    lucideMusic2,
    lucideCalendar,
    lucideWebhook,
    lucideZap,
    lucideSparkles,
    lucideBrainCircuit,
    lucideMessageSquare,
    lucideCalendarCheck,
    lucideArrowUpRight,
    lucidePlus,
    lucideLink,
    lucideCheck,
    lucideUserPlus,
    lucideUserRoundCheck,
    lucideRotateCcw,
    lucideUsersRound,
    lucideBellRing,
    
  })],
  selector: 'app-home',
  styleUrl: './home.component.css',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnDestroy {
  private readonly seo = inject(SeoService);

  constructor() {
    // Mismo título y descripción que index.html; aquí se añaden el canonical y las etiquetas para redes.
    this.seo.apply({
      title: 'Automatización de procesos con IA y CRM | GrowthProject AI',
      description:
        'Automatizamos la atención por WhatsApp, el seguimiento de leads y tu CRM con inteligencia artificial. Implementación estimada de 5 a 7 días y atención automática 24/7.',
      path: '/',
    });
  }

  public ngOnDestroy(): void {
    this.seo.restore();
  }

  private readonly meetingDialogService = inject(MeetingDialogService);

  public openMeetingDialog(): void {
    this.meetingDialogService.requestOpen();
  }

  items = [

    {
      title: 'WhatsApp',
      subtitle: 'Conversaciones',
      icon: 'lucideMessageCircle'
    },

    {
      title: 'Instagram',
      subtitle: 'Mensajes y leads',
      icon: 'lucideSend'
    },

    {
      title: 'Facebook',
      subtitle: 'Messenger',
      icon: 'lucideMessagesSquare'
    },

    {
      title: 'TikTok',
      subtitle: 'Captación',
      icon: 'lucideMusic2'
    },

    {
      title: 'Email',
      subtitle: 'Marketing',
      icon: 'lucideMail'
    },

    {
      title: 'SMS',
      subtitle: 'Seguimiento',
      icon: 'lucideSmartphone'
    },

    {
      title: 'IA',
      subtitle: 'Agentes inteligentes',
      icon: 'lucideBot'
    },

    {
      title: 'CRM',
      subtitle: 'Gestión de clientes',
      icon: 'lucideDatabase'
    },

    {
      title: 'Workflows',
      subtitle: 'Automatización',
      icon: 'lucideWorkflow'
    },

    {
      title: 'Calendario',
      subtitle: 'Reservas',
      icon: 'lucideCalendar'
    },

    {
      title: 'Leads',
      subtitle: 'Calificación',
      icon: 'lucideFilter'
    },

    {
      title: 'Pagos',
      subtitle: 'Procesamiento',
      icon: 'lucideCreditCard'
    },

    {
      title: 'Webhooks',
      subtitle: 'Integraciones',
      icon: 'lucideWebhook'
    },

    {
      title: 'Formularios',
      subtitle: 'Captación',
      icon: 'lucideClipboardList'
    },

    {
      title: 'Analytics',
      subtitle: 'Resultados',
      icon: 'lucideChartNoAxesCombined'
    },

    {
      title: 'Seguimiento',
      subtitle: 'Automático',
      icon: 'lucideRefreshCw'
    }

  ];

  /** Los artículos salen de features/blog/blog.data.ts, así el inicio y el blog no se desincronizan. */
  public blogPosts = [...POSTS]
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((post, index) => ({
      id: index + 1,
      category: post.category,
      date: formatPostDate(post.date),
      readTime: post.readTime,
      title: post.title,
      description: post.description,
      image: postImage(post, 720),
      link: '/blog/' + post.slug,
    }));


  /** Los planes salen de features/plans/plans.data.ts (la misma fuente que las páginas de cada plan); se dibujan con app-plan-card. */
  public readonly plans = PLANS;

  public faqs = [
    {
      question: '¿Qué tipo de procesos pueden automatizar?',
      answer:
        'Podemos automatizar tareas repetitivas relacionadas con captación de leads, respuestas, seguimiento, calificación, actualización del CRM, agendamiento, recordatorios, reactivación y comunicación.',
    },
    {
      question: '¿Trabajan con WhatsApp?',
      answer:
        'Sí. Podemos trabajar flujos donde WhatsApp forme parte de la captación, atención, seguimiento, calificación y comunicación automática con tus prospectos o clientes.',
    },
    {
      question: '¿También pueden automatizar Instagram, Facebook y TikTok?',
      answer:
        'Sí. Dependiendo del objetivo y de las herramientas disponibles, podemos conectar diferentes canales y hacer que la información continúe automáticamente hacia el CRM y los siguientes pasos del proceso.',
    },
    {
      question: '¿Necesito tener un CRM para trabajar con ustedes?',
      answer:
        'No necesariamente. Podemos trabajar sobre herramientas que ya utilizas o ayudarte a estructurar un sistema centralizado para gestionar leads, conversaciones, oportunidades y seguimiento.',
    },
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
      question: '¿Trabajan con GoHighLevel?',
      answer:
        'Sí. Podemos trabajar con GoHighLevel para estructurar CRM, workflows, automatizaciones, conversaciones, seguimiento, oportunidades y diferentes procesos comerciales.',
    },
    {
      question: '¿Cómo empieza un proyecto de automatización?',
      answer:
        'Primero analizamos cómo funciona actualmente tu proceso: captación, atención, seguimiento y herramientas. A partir de ahí identificamos qué tareas pueden automatizarse y diseñamos el sistema que mejor se adapte a tu operación.',
    },
  ];

  public plugins = [AutoScroll({
    active: true,
    stopOnInteraction: false,
    stopOnFocusIn: false,
    stopOnMouseEnter: true,
    startDelay: 0,

  })]

}
