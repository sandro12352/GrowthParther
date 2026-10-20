import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowRight, lucidePlus } from '@ng-icons/lucide';
import { RevealDirective } from '../../core/reveal.directive';
import { MeetingDialogService } from '../components/services/meeting-dialog.service';
import { PageContent } from '../models/page-content.model';

/** Cierre común de las páginas de servicios: preguntas frecuentes, llamada a la acción y enlaces relacionados. */
@Component({
  selector: 'app-page-closing',
  imports: [NgIcon, RouterLink, RevealDirective],
  providers: [provideIcons({ lucideArrowRight, lucidePlus })],
  templateUrl: './page-closing.component.html',
})
export class PageClosingComponent {
  private readonly meetingDialogService = inject(MeetingDialogService);

  public readonly page = input.required<Pick<PageContent, 'faqs' | 'cta'>>();
  /** Nota pequeña al pie (por ejemplo, aviso de marcas de terceros). */
  public readonly note = input<string>('');
  public readonly related = input<{ label: string; path: string }[]>([]);

  public openMeetingDialog(): void {
    this.meetingDialogService.requestOpen();
  }
}
