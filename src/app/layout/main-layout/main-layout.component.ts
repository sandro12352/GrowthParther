import { Component, computed, inject } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../shared/footer/footer.component';
import { ChatFabComponent } from '../../shared/chat-fab/chat-fab.component';
import { FormMeetingComponent } from '../../shared/components/form-meeting/form-meeting.component';
import { MeetingDialogService } from '../../shared/components/services/meeting-dialog.service';

@Component({
  imports: [HeaderComponent, RouterOutlet, FooterComponent, FormMeetingComponent, ChatFabComponent],
  selector: 'app-main-layout',
  styleUrl: './main-layout.component.css',
  templateUrl: './main-layout.component.html',
})
export class MainLayoutComponent {
  private readonly meetingDialogService = inject(MeetingDialogService);

  /** El formulario de reunión (calendario, selectores, diálogo) pesa bastante: se carga cuando alguien lo pide o, antes, cuando el navegador está libre. */
  protected readonly meetingRequested = computed(() => this.meetingDialogService.openRequests() > 0);
}
