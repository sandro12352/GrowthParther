import { Component, ElementRef, OnDestroy, inject, signal, viewChild } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideMaximize2, lucideX } from '@ng-icons/lucide';
import { RevealDirective } from '../../../core/reveal.directive';
import { SeoService } from '../../../core/seo.service';
import { CaseSceneComponent } from './case-scene/case-scene.component';
import { PageClosingComponent } from '../../../shared/page-closing/page-closing.component';
import { CASES, WorkflowCase } from './cases.data';
import { PageContent } from '../../../shared/models/page-content.model';

/** Página «Casos de éxito»: los workflows reales de `cases.data.ts`, con visor ampliado. */
@Component({
  selector: 'app-case-studies',
  imports: [NgIcon, RevealDirective, PageClosingComponent, CaseSceneComponent],
  providers: [provideIcons({ lucideMaximize2, lucideX })],
  templateUrl: './case-studies.component.html',
})
export class CaseStudiesComponent implements OnDestroy {
  private readonly seo = inject(SeoService);
  private readonly viewer = viewChild<ElementRef<HTMLDialogElement>>('viewer');

  public readonly cases = CASES;

  /** Caso abierto en el visor (null con el visor cerrado). */
  public readonly viewing = signal<WorkflowCase | null>(null);

  public readonly closing: Pick<PageContent, 'faqs' | 'cta'> = {
    faqs: [],
    cta: {
      title: '¿Quieres un proceso así para tu negocio?',
      text: 'Cuéntanos cómo trabajas hoy y diseñamos el sistema que mejor se adapte a tu operación.',
      button: 'Solicitar reunión',
    },
  };

  constructor() {
    this.seo.apply({
      title: 'Casos de éxito de automatización | GrowthProject AI',
      description:
        'Workflows reales que hemos construido: pedidos, cotizaciones, calificación de prospectos, agendamiento y seguimiento automático.',
      path: '/casos-de-exito',
    });
  }

  public open(item: WorkflowCase): void {
    this.viewing.set(item);
    this.viewer()?.nativeElement.showModal();
  }

  public close(): void {
    this.viewer()?.nativeElement.close();
  }

  public onClosed(): void {
    this.viewing.set(null);
  }

  public onBackdropClick(event: MouseEvent): void {
    if (event.target === this.viewer()?.nativeElement) {
      this.close();
    }
  }

  public ngOnDestroy(): void {
    this.seo.restore();
  }
}
