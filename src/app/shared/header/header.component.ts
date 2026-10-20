import { Component, DestroyRef, afterNextRender, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCircle, lucideInfo,lucideCalendar,lucideUserRound, lucideArrowUpRight, lucideWorkflow, lucideSparkles, lucideDatabase, lucideLink, lucideBot, lucideMenu, lucideSend, lucideMessageCircle } from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmNavigationMenuImports } from '@spartan-ng/helm/navigation-menu';
import { HlmSheetImports } from '@spartan-ng/helm/sheet';
import { MeetingDialogService } from '../components/services/meeting-dialog.service';
@Component({
  selector: 'app-header',
  imports: [NgIcon, RouterLink, HlmNavigationMenuImports, HlmButtonImports, HlmSheetImports],
  providers: [provideIcons({
    lucideCircle,
    lucideInfo,
    lucideCalendar,
    lucideUserRound,
    lucideArrowUpRight,
    lucideWorkflow,
    lucideSparkles,
    lucideDatabase,
    lucideLink,
    lucideBot,
    lucideMenu,
    lucideSend,
    lucideMessageCircle
  })],
  styleUrl: './header.component.css',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  private readonly meetingDialogService = inject(MeetingDialogService);
  private readonly destroyRef = inject(DestroyRef);

  /** true cuando la página ya bajó: el header se acerca al borde superior. */
  public readonly scrolled = signal(false);

  constructor() {
    afterNextRender(() => {
      const update = () => this.scrolled.set(window.scrollY > 40);
      update();
      window.addEventListener('scroll', update, { passive: true });
      this.destroyRef.onDestroy(() => window.removeEventListener('scroll', update));
    });
  }

  public openMeetingDialog(): void {
    this.meetingDialogService.requestOpen();
  }
}
