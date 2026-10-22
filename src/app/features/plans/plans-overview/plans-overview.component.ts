import { Component, OnDestroy, inject } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCheck } from '@ng-icons/lucide';
import { RevealDirective } from '../../../core/reveal.directive';
import { SeoService } from '../../../core/seo.service';
import { PageClosingComponent } from '../../../shared/page-closing/page-closing.component';
import { PageContent } from '../../../shared/models/page-content.model';
import { PlanCardComponent } from '../plan-card/plan-card.component';
import { COMPARISON, PLANS, PLANS_FAQS, PRICES_AS_OF } from '../plans.data';

/** Página «Planes» (/planes): los tres planes y una tabla comparativa. El contenido sale de plans.data.ts. */
@Component({
  selector: 'app-plans-overview',
  imports: [NgIcon, RevealDirective, PageClosingComponent, PlanCardComponent],
  providers: [provideIcons({ lucideCheck })],
  templateUrl: './plans-overview.component.html',
})
export class PlansOverviewComponent implements OnDestroy {
  private readonly seo = inject(SeoService);

  public readonly plans = PLANS;
  public readonly comparison = COMPARISON;
  public readonly pricesAsOf = PRICES_AS_OF;

  public readonly closing: Pick<PageContent, 'faqs' | 'cta'> = {
    faqs: PLANS_FAQS,
    cta: {
      title: '¿No sabes qué plan elegir?',
      text: 'Cuéntanos cómo trabajas hoy y te recomendamos el que mejor se adapta.',
      button: 'Solicitar reunión',
    },
  };

  public readonly related = [
    { label: 'Automatización de procesos', path: '/automatizacion' },
    { label: 'IA para empresas', path: '/ia-para-empresas' },
    { label: 'Casos de éxito', path: '/casos-de-exito' },
  ];

  constructor() {
    this.seo.apply({
      title: 'Planes y precios de automatización con IA | GrowthProject AI',
      description:
        'Compara los planes Básico, Comercial y Avanzado: asistente de IA en WhatsApp, seguimiento de leads e integraciones. Desde US$ 400 y US$ 90 al mes.',
      path: '/planes',
    });
  }

  public ngOnDestroy(): void {
    this.seo.restore();
  }
}
