import { Component, OnDestroy, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowRight, lucideBot, lucideDatabase, lucideMessageCircle, lucideSend, lucideSparkles, lucideWorkflow } from '@ng-icons/lucide';
import { RevealDirective } from '../../../core/reveal.directive';
import { SeoService } from '../../../core/seo.service';
import { MeetingDialogService } from '../../../shared/components/services/meeting-dialog.service';
import { PageClosingComponent } from '../../../shared/page-closing/page-closing.component';
import { PageContent } from '../../../shared/models/page-content.model';

/** Índice «Todas las integraciones»: una tarjeta por cada herramienta. */
@Component({
  selector: 'app-integrations-overview',
  imports: [NgIcon, RouterLink, RevealDirective, PageClosingComponent],
  providers: [provideIcons({ lucideArrowRight, lucideBot, lucideDatabase, lucideMessageCircle, lucideSend, lucideSparkles, lucideWorkflow })],
  templateUrl: './overview.component.html',
})
export class IntegrationsOverviewComponent implements OnDestroy {
  private readonly seo = inject(SeoService);
  private readonly meetingDialogService = inject(MeetingDialogService);

  /** Herramientas del índice: una tarjeta por cada una (la ruta es la de su página). */
  public readonly tools = [
    { path: 'integraciones/whatsapp', name: 'WhatsApp', summary: 'Atención y seguimiento', icon: 'lucideMessageCircle' },
    { path: 'integraciones/meta', name: 'Meta', summary: 'Facebook + Instagram', icon: 'lucideSend' },
    { path: 'integraciones/n8n', name: 'n8n', summary: 'Automatizaciones avanzadas', icon: 'lucideWorkflow' },
    { path: 'integraciones/gohighlevel', name: 'GoHighLevel', summary: 'CRM + Workflows', icon: 'lucideDatabase' },
  ];

  // Respuesta real del FAQ del home.
  public readonly closing: Pick<PageContent, 'faqs' | 'cta'> = {
    faqs: [
      {
        question: '¿Pueden conectar las herramientas que ya utiliza mi empresa?',
        answer:
          'Sí. Evaluamos las herramientas que utilizas actualmente y, cuando existen las integraciones o conexiones necesarias, podemos incorporarlas dentro del flujo de automatización.',
      },
      {
        question: '¿Necesito tener un CRM para trabajar con ustedes?',
        answer:
          'No necesariamente. Podemos trabajar sobre herramientas que ya utilizas o ayudarte a estructurar un sistema centralizado para gestionar leads, conversaciones, oportunidades y seguimiento.',
      },
    ],
    cta: {
      title: '¿Qué herramientas quieres conectar?',
      text: 'Cuéntanos con qué trabajas hoy y vemos cómo integrarlo.',
      button: 'Solicitar reunión',
    },
  };

  constructor() {
    this.seo.apply({
      title: 'Integraciones | GrowthProject AI',
      description:
        'Conectamos WhatsApp, Meta, n8n, GoHighLevel y las herramientas que ya utiliza tu empresa dentro de un mismo flujo de automatización.',
      path: '/integraciones',
      noindex: true,
    });
  }

  public openMeetingDialog(): void {
    this.meetingDialogService.requestOpen();
  }

  public ngOnDestroy(): void {
    this.seo.restore();
  }
}
