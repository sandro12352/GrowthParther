import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowRight, lucideArrowUpRight, lucideBot, lucideBrainCircuit, lucideCalendar, lucideCalendarCheck, lucideCalendarDays, lucideChartNoAxesCombined, lucideClipboardList, lucideClock3, lucideCreditCard, lucideDatabase, lucideFacebook, lucideFilter, lucideInstagram, lucideMail, lucideMessageCircle, lucideMessageSquare, lucideMusic2, lucidePlay, lucidePlus, lucideRefreshCw, lucideSettings2, lucideShare2, lucideSmartphone, lucideSparkles, lucideStar, lucideUsers, lucideWebhook, lucideWorkflow, lucideZap } from '@ng-icons/lucide';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmCarouselImports } from '@spartan-ng/helm/carousel';
import AutoScroll from 'embla-carousel-auto-scroll'

@Component({
  imports: [NgIcon, HlmCarouselImports, HlmCardImports, RouterLink],
  providers: [provideIcons({
    lucideUsers,
    lucideChartNoAxesCombined,
    lucideClock3,
    lucideSettings2,
    lucideArrowRight,
    lucideMessageCircle,
    lucideInstagram,
    lucideFacebook,
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
    lucidePlus
  })],
  selector: 'app-home',
  styleUrl: './home.component.css',
  templateUrl: './home.component.html',
})
export class HomeComponent {

  items = [

    {
      title: 'WhatsApp',
      subtitle: 'Conversaciones',
      icon: 'lucideMessageCircle'
    },

    {
      title: 'Instagram',
      subtitle: 'Mensajes y leads',
      icon: 'lucideInstagram'
    },

    {
      title: 'Facebook',
      subtitle: 'Messenger',
      icon: 'lucideFacebook'
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

  public blogPosts = [
  {
    id: 1,
    category: 'Automatización',
    date: '24 Sep 2026',
    readTime: '5 min lectura',
    title: '¿Qué procesos de tu empresa deberías automatizar primero?',
    description:
      'Una guía práctica para identificar tareas repetitivas y convertirlas en procesos automáticos que ahorren tiempo a tu equipo.',
    image: '/blog/automatizacion.png',
    link: '/blog/procesos-automatizar'
  },
  {
    id: 2,
    category: 'Inteligencia Artificial',
    date: '18 Sep 2026',
    readTime: '6 min lectura',
    title: 'Cómo utilizar IA para automatizar la atención de tus clientes',
    description:
      'Descubre cómo integrar inteligencia artificial en tus conversaciones, seguimiento y procesos comerciales.',
    image: '/blog/inteligencia-artificial.png',
    link: '/blog/ia-atencion-clientes'
  },
  {
    id: 3,
    category: 'CRM',
    date: '12 Sep 2026',
    readTime: '4 min lectura',
    title: 'Por qué tus leads se pierden aunque tengas un CRM',
    description:
      'Tener un CRM no garantiza un buen seguimiento. Conoce los procesos que necesitas automatizar alrededor de tu equipo comercial.',
    image: '/blog/crm-leads.png',
    link: '/blog/crm-seguimiento'
  },
  {
    id: 4,
    category: 'WhatsApp',
    date: '05 Sep 2026',
    readTime: '5 min lectura',
    title: 'Cómo automatizar WhatsApp sin perder el toque humano',
    description:
      'La automatización puede responder, calificar y hacer seguimiento sin convertir tus conversaciones en mensajes genéricos.',
    image: '/blog/whatsapp.png',
    link: '/blog/whatsapp-automatizado'
  },
  {
    id: 5,
    category: 'Ventas',
    date: '28 Ago 2026',
    readTime: '7 min lectura',
    title: 'De lead a cliente: cómo construir un sistema de seguimiento',
    description:
      'Un proceso comercial bien diseñado puede hacer que cada oportunidad tenga un siguiente paso claro y medible.',
    image: '/blog/seguimiento.png',
    link: '/blog/sistema-seguimiento'
  },
  {
    id: 6,
    category: 'Integraciones',
    date: '20 Ago 2026',
    readTime: '5 min lectura',
    title: 'Cómo conectar tus herramientas para que trabajen juntas',
    description:
      'CRM, WhatsApp, formularios, IA y otras herramientas pueden formar parte de un mismo sistema.',
    image: '/blog/integraciones.png',
    link: '/blog/integraciones'
  }
];


  public plugins = [AutoScroll({
    active: true,
    stopOnInteraction: false,
    stopOnFocusIn: false,
    stopOnMouseEnter: true,
    startDelay: 0,

  })]

}
