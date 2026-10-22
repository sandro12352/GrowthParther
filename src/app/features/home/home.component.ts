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
        'Automatizamos la atención por WhatsApp, el seguimiento de leads y tu CRM con inteligencia artificial. Implementación estimada de 5 a 7 días y soporte 24/7.',
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


  // Escalera de valor: del plan más simple (claro, neutro) al más completo (oscuro, gradiente).
  private readonly planThemes = {
    basic: {
      frame: 'bg-black/10 shadow-[0_20px_50px_rgba(8,9,17,0.08)]',
      card: 'bg-[#f4f4f7]',
      glow: 'bg-[#6C8CFF]/10',
      eyebrow: 'text-[#5b49d6]',
      badge: 'border border-black/10 bg-black/[0.04] text-black/65',
      title: 'text-[#080911]',
      text: 'text-black/65',
      priceBox: 'border-black/10 bg-white',
      divider: 'bg-black/10',
      setup: 'text-[#080911]',
      monthly: 'text-[#5b49d6]',
      check: 'text-[#5b49d6]',
      ideal: 'border-[#6C5CE7] bg-[#6C5CE7]/10 text-[#080911]/80',
      button: 'btn-fx [--fx:#080911] border border-[#080911]/15 bg-white text-[#080911] hover:text-white',
    },
    commercial: {
      frame: 'bg-gradient-to-br from-[#A99CFF] via-[#6C5CE7] to-[#6C8CFF] shadow-[0_30px_80px_rgba(108,92,231,0.4)]',
      card: 'bg-gradient-to-b from-[#5b49d6] to-[#3a2a9e]',
      glow: 'bg-white/25',
      eyebrow: 'text-white/80',
      badge: 'bg-white text-[#3a2a9e]',
      title: 'text-white',
      text: 'text-white/80',
      priceBox: 'border-white/20 bg-white/10',
      divider: 'bg-white/20',
      setup: 'text-white',
      monthly: 'text-white',
      check: 'text-[#00F2FE]',
      ideal: 'border-white bg-white/10 text-white/90',
      button: 'btn-fx [--fx:#080911] bg-white text-[#3a2a9e] hover:text-white hover:shadow-[0_10px_30px_rgba(8,9,17,0.35)]',
    },
    advanced: {
      frame: 'bg-gradient-to-br from-[#6C5CE7] via-[#6C8CFF] to-[#00F2FE] shadow-[0_30px_90px_rgba(0,242,254,0.25)]',
      card: 'bg-[#080911]',
      glow: 'bg-[#00F2FE]/25',
      eyebrow: 'text-[#00F2FE]',
      badge: 'bg-gradient-to-r from-[#6C5CE7] to-[#00F2FE] text-[#080911]',
      title: 'text-white',
      text: 'text-white/75',
      priceBox: 'border-white/10 bg-white/[0.04]',
      divider: 'bg-white/10',
      setup: 'text-white',
      monthly: 'bg-gradient-to-r from-[#A99CFF] to-[#00F2FE] bg-clip-text text-transparent',
      check: 'text-[#00F2FE]',
      ideal: 'border-[#00F2FE] bg-[#00F2FE]/10 text-white/85',
      button: 'btn-fx [--fx:#6C5CE7] bg-gradient-to-r from-[#6C5CE7] via-[#6C8CFF] to-[#00F2FE] text-[#080911] hover:text-white hover:shadow-[0_10px_30px_rgba(0,242,254,0.4)]',
    },
  };

  public plans = [
    {
      id: 1,
      number: '01',
      name: 'Plan Básico',
      badge: 'Simple',
      featured: false,
      tilt: 'lg:-rotate-2',
      theme: this.planThemes.basic,
      tagline: 'Un chatbot que responde por ti en WhatsApp.',
      setup: '400',
      monthly: '90',
      conversations: '300 conversaciones/mes',
      includesTitle: 'Incluye',
      features: [
        { title: 'Chatbot con IA', detail: 'para preguntas frecuentes' },
        { title: 'Información del negocio', detail: 'servicios, precios y horarios' },
        { title: 'Atención automática por WhatsApp' },
        { title: 'Derivación a una persona', detail: 'cuando sea necesario' },
        { title: 'Supervisión y mantenimiento básico' },
      ],
      idealFor: 'pequeños negocios que reciben preguntas repetitivas.',
    },
    {
      id: 2,
      number: '02',
      name: 'Plan Comercial',
      badge: 'Recomendado',
      featured: true,
      tilt: 'lg:-translate-y-4',
      theme: this.planThemes.commercial,
      tagline: 'Convierte consultas en oportunidades de venta.',
      setup: '750',
      monthly: '180',
      conversations: '1.000 conversaciones/mes',
      includesTitle: 'Todo el Plan Básico, más:',
      features: [
        { title: 'Calificación de clientes potenciales' },
        { title: 'Captura de nombre, teléfono y necesidad' },
        { title: 'Flujos de conversación personalizados' },
        { title: 'Registro de leads', detail: 'en Google Sheets o una base de datos' },
        { title: 'Seguimientos automáticos básicos' },
      ],
      idealFor: 'empresas que quieren convertir consultas en oportunidades comerciales.',
    },
    {
      id: 3,
      number: '03',
      name: 'Plan Avanzado',
      badge: 'Integraciones',
      featured: false,
      tilt: 'lg:rotate-2',
      theme: this.planThemes.advanced,
      tagline: 'Procesos de venta completos, conectados a tus sistemas.',
      setup: '1.500',
      monthly: '350',
      conversations: 'Conversaciones ilimitadas',
      includesTitle: 'Todo el Plan Comercial, más:',
      // Las 5 características clave: así los tres planes muestran el mismo número y mantienen la misma altura.
      features: [
        { title: 'Agendamiento', detail: 'con Google Calendar' },
        { title: 'CRM y APIs', detail: 'hasta 2 integraciones' },
        { title: 'Pipelines de venta', detail: 'etapas y seguimiento' },
        { title: 'Agentes de IA', detail: 'modelos OpenAI avanzados' },
        { title: 'Pasarelas de pago', detail: 'Stripe, Mercado Pago y más' },
      ],
      // Resto de lo que incluye este plan: no se muestra en las tarjetas (por ahora).
      extraFeatures: [
        { title: 'Inventario en vivo', detail: 'stock, precios, horarios' },
        { title: 'Cotizaciones', detail: 'creadas en el chat' },
        { title: 'Landing page', detail: 'formulario directo al CRM' },
        { title: 'Imagen, video y audio', detail: 'reconocimiento con IA' },
        { title: 'Flujos a medida', detail: 'condiciones y acciones' },
      ],
      idealFor: 'inmobiliarias, concesionarios y empresas con procesos de venta complejos.',
    },
  ];

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
