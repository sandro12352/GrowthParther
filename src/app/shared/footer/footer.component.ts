import { Component, inject } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowUpRight } from '@ng-icons/lucide';
import { MeetingDialogService } from '../components/services/meeting-dialog.service';

@Component({
  imports: [NgIcon],
  providers:[provideIcons({
    lucideArrowUpRight,
  })],
  selector: 'app-footer',
  styleUrl: './footer.component.css',
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  private readonly meetingDialogService = inject(MeetingDialogService);

  public openMeetingDialog(): void {
    this.meetingDialogService.requestOpen();
  }
}
