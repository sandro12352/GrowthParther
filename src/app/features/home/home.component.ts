import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowRight, lucideBot, lucideCalendar, lucideCalendarDays, lucideChartNoAxesCombined, lucideClipboardList, lucideClock3, lucideCreditCard, lucideDatabase, lucideFacebook, lucideFilter, lucideInstagram, lucideMail, lucideMessageCircle, lucideMusic2, lucidePlay, lucideRefreshCw, lucideSettings2, lucideShare2, lucideSmartphone, lucideSparkles, lucideStar, lucideUsers, lucideWebhook, lucideWorkflow, lucideZap } from '@ng-icons/lucide';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmCarouselImports } from '@spartan-ng/helm/carousel';
import AutoScroll from 'embla-carousel-auto-scroll'

@Component({
  imports: [NgIcon, HlmCarouselImports, HlmCardImports],
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
    lucideSparkles
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


  public plugins = [AutoScroll({
    active: true,
    stopOnInteraction: false,
    stopOnFocusIn: false,
    stopOnMouseEnter: true,
    startDelay: 0,

  })]

}
