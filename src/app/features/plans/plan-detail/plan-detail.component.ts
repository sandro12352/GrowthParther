import { Component, OnDestroy, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideActivity,
  lucideArrowLeft,
  lucideArrowRight,
  lucideBookOpen,
  lucideBot,
  lucideCalendar,
  lucideCalendarCheck,
  lucideChartNoAxesCombined,
  lucideCheck,
  lucideClipboardList,
  lucideFileText,
  lucideFilter,
  lucideGraduationCap,
  lucideHeartHandshake,
  lucideInfinity,
  lucideLifeBuoy,
  lucideLink,
  lucideMessageCircle,
  lucideMessagesSquare,
  lucidePlug,
  lucideRefreshCw,
  lucideSettings2,
  lucideTarget,
  lucideTrendingUp,
  lucideUserRoundCheck,
  lucideUsersRound,
  lucideWorkflow,
  lucideWrench,
  lucideX,
  lucideZap,
} from '@ng-icons/lucide';
import { whatsappUrl } from '../../../core/contact.config';
import { RevealDirective } from '../../../core/reveal.directive';
import { SeoService } from '../../../core/seo.service';
import { MeetingDialogService } from '../../../shared/components/services/meeting-dialog.service';
import { PageClosingComponent } from '../../../shared/page-closing/page-closing.component';
import { PageContent } from '../../../shared/models/page-content.model';
import { PLANS, Plan, PRICES_AS_OF, findPlan } from '../plans.data';

/**
 * Página de un plan (/planes/<slug>): cabecera con precios, qué incluye la implementación, el servicio mensual,
 * cómo trabajamos, lo que se necesita del cliente, lo que no incluye y la forma de pago.
 * Todo el contenido sale de plans.data.ts.
 */
@Component({
  selector: 'app-plan-detail',
  imports: [NgIcon, RouterLink, RevealDirective, PageClosingComponent],
  // Los nombres de icono de plans.data.ts deben estar registrados aquí.
  providers: [
    provideIcons({
      lucideActivity,
      lucideArrowLeft,
      lucideArrowRight,
      lucideBookOpen,
      lucideBot,
      lucideCalendar,
      lucideCalendarCheck,
      lucideChartNoAxesCombined,
      lucideCheck,
      lucideClipboardList,
      lucideFileText,
      lucideFilter,
      lucideGraduationCap,
      lucideHeartHandshake,
      lucideInfinity,
          lucideLifeBuoy,
      lucideLink,
      lucideMessageCircle,
      lucideMessagesSquare,
      lucidePlug,
      lucideRefreshCw,
      lucideSettings2,
      lucideTarget,
      lucideTrendingUp,
      lucideUserRoundCheck,
      lucideUsersRound,
      lucideWorkflow,
      lucideWrench,
      lucideX,
      lucideZap,
    }),
  ],
  templateUrl: './plan-detail.component.html',
})
export class PlanDetailComponent implements OnDestroy {
  private readonly seo = inject(SeoService);
  private readonly router = inject(Router);
  private readonly meetingDialogService = inject(MeetingDialogService);

  public readonly plan: Plan | undefined = findPlan(inject(ActivatedRoute).snapshot.paramMap.get('slug'));
  public readonly pricesAsOf = PRICES_AS_OF;

  /** WhatsApp con el mensaje del plan ya escrito ('' si no hay número). */
  public readonly whatsapp = this.plan ? whatsappUrl(`Hola, quiero información del ${this.plan.name}.`) : '';

  public readonly closing: Pick<PageContent, 'faqs' | 'cta'> = {
    faqs: [], // las preguntas frecuentes de los planes están solo en /planes
    cta: {
      title: this.plan ? `¿Te interesa el ${this.plan.name}?` : '¿Te interesa un plan?',
      text: 'Cuéntanos cómo trabajas hoy y confirmamos contigo el alcance, antes de empezar.',
      button: 'Solicitar reunión',
    },
  };

  public readonly related = [
    ...PLANS.filter((other) => other.slug !== this.plan?.slug).map((other) => ({ label: other.name, path: `/planes/${other.slug}` })),
    { label: 'Comparar los planes', path: '/planes' },
  ];

  constructor() {
    if (!this.plan) {
      // Dirección que no corresponde a ningún plan: vuelve a la comparación.
      void this.router.navigateByUrl('/planes', { replaceUrl: true });
      return;
    }
    this.seo.apply({
      title: this.plan.seo.title,
      description: this.plan.seo.description,
      path: `/planes/${this.plan.slug}`,
    });
  }

  public openMeetingDialog(): void {
    this.meetingDialogService.requestOpen();
  }

  public ngOnDestroy(): void {
    this.seo.restore();
  }
}
