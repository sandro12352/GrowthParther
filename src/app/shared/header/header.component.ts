import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCircle, lucideInfo,lucideCalendar,lucideUserRound, lucideArrowUpRight, lucideWorkflow, lucideSparkles, lucideDatabase, lucideLink, lucideBot, lucideMenu } from '@ng-icons/lucide';
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
    lucideMenu
  })],
  styleUrl: './header.component.css',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  private readonly meetingDialogService = inject(MeetingDialogService);

  public openMeetingDialog(): void {
    this.meetingDialogService.requestOpen();
  }
}
