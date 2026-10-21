import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../shared/footer/footer.component';
import { ChatFabComponent } from '../../shared/chat-fab/chat-fab.component';
import { FormMeetingComponent } from '../../shared/components/form-meeting/form-meeting.component';

@Component({
  imports: [HeaderComponent, RouterOutlet, FooterComponent, FormMeetingComponent, ChatFabComponent],
  selector: 'app-main-layout',
  styleUrl: './main-layout.component.css',
  templateUrl: './main-layout.component.html',
})
export class MainLayoutComponent {}
