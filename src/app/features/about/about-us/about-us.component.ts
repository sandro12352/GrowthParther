import { Component, OnDestroy, inject } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowRight, lucideDatabase, lucideLink, lucideSparkles, lucideWorkflow } from '@ng-icons/lucide';
import { RevealDirective } from '../../../core/reveal.directive';
import { SeoService } from '../../../core/seo.service';
import { MeetingDialogService } from '../../../shared/components/services/meeting-dialog.service';
import { PageClosingComponent } from '../../../shared/page-closing/page-closing.component';
import { PageContent } from '../../../shared/models/page-content.model';

/**
 * Página «Nosotros». Los textos son los de la sección «GrowthProject AI Partner» del inicio.
 * Pendiente de contenido del equipo: historia, equipo, valores y cifras (no se inventan aquí).
 */
@Component({
  selector: 'app-about-us',
  imports: [NgIcon, RevealDirective, PageClosingComponent],
  providers: [provideIcons({ lucideArrowRight, lucideDatabase, lucideLink, lucideSparkles, lucideWorkflow })],
  templateUrl: './about-us.component.html',
})
export class AboutUsComponent implements OnDestroy {
  private readonly seo = inject(SeoService);
  private readonly meetingDialogService = inject(MeetingDialogService);

  public readonly areas = [
    { icon: 'lucideWorkflow', title: 'Automatización', text: 'Procesos que avanzan automáticamente.' },
    { icon: 'lucideSparkles', title: 'Inteligencia Artificial', text: 'Sistemas que entienden y responden.' },
    { icon: 'lucideDatabase', title: 'CRM', text: 'Información centralizada y organizada.' },
    { icon: 'lucideLink', title: 'Integraciones', text: 'Todas tus herramientas trabajando juntas.' },
  ];

  public readonly closing: Pick<PageContent, 'faqs' | 'cta'> = {
    faqs: [],
    cta: {
      title: 'Conversemos sobre tu proceso',
      text: 'Cuéntanos cómo trabaja tu negocio y diseñamos el sistema que mejor se adapte.',
      button: 'Solicitar reunión',
    },
  };

  constructor() {
    this.seo.apply({
      title: 'Nosotros | GrowthProject AI',
      description:
        'Somos una empresa dedicada a la automatización de procesos, inteligencia artificial, CRM e integración de herramientas digitales.',
      path: '/nosotros',
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
