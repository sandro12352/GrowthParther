import { Component, OnDestroy, OnInit, inject, input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideArrowDown,
  lucideArrowRight,
  lucideBellRing,
  lucideBot,
  lucideCheck,
  lucideDatabase,
  lucideGitBranch,
  lucideMail,
  lucideMessageCircle,
  lucidePlug,
  lucideRefreshCw,
  lucideSend,
  lucideSparkles,
  lucideTarget,
  lucideUserPlus,
  lucideUserRoundCheck,
  lucideWorkflow,
  lucideZap,
} from '@ng-icons/lucide';
import { RevealDirective } from '../../../core/reveal.directive';
import { SeoService } from '../../../core/seo.service';
import { SequenceDirective } from '../../../core/sequence.directive';
import { MeetingDialogService } from '../../../shared/components/services/meeting-dialog.service';
import { PageClosingComponent } from '../../../shared/page-closing/page-closing.component';
import { PageContent } from '../../../shared/models/page-content.model';

/** Plantilla común de las páginas de herramientas (WhatsApp, Meta, n8n, GoHighLevel): cada una la usa con su propio contenido. */
@Component({
  selector: 'app-integration-layout',
  imports: [NgIcon, RevealDirective, SequenceDirective, PageClosingComponent],
  providers: [
    provideIcons({
      lucideArrowDown,
      lucideArrowRight,
      lucideBellRing,
      lucideBot,
      lucideCheck,
      lucideDatabase,
      lucideGitBranch,
      lucideMail,
      lucideMessageCircle,
      lucidePlug,
      lucideRefreshCw,
      lucideSend,
      lucideSparkles,
      lucideTarget,
      lucideUserPlus,
      lucideUserRoundCheck,
      lucideWorkflow,
      lucideZap,
    }),
  ],
  templateUrl: './integration-layout.component.html',
})
export class IntegrationLayoutComponent implements OnInit, OnDestroy {
  private readonly seo = inject(SeoService);
  private readonly meetingDialogService = inject(MeetingDialogService);

  /** Aviso de marcas de terceros (los logos y nombres pertenecen a sus dueños). */
  public readonly brandNote =
    'Las marcas mencionadas pertenecen a sus respectivos dueños. GrowthProject AI no está afiliado a ellas.';

  /** Contenido de la herramienta: lo entrega cada página (whatsapp, meta, n8n, gohighlevel). */
  public readonly page = input.required<PageContent>();

  public ngOnInit(): void {
    const page = this.page();
    this.seo.apply({
      title: page.seo.title,
      description: page.seo.description,
      path: `/${page.path}`,
      noindex: page.draft,
    });
  }

  public openMeetingDialog(): void {
    this.meetingDialogService.requestOpen();
  }

  public ngOnDestroy(): void {
    this.seo.restore();
  }
}
