import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowUpRight, lucideInstagram, lucideFacebook, lucideLinkedin, lucideMessageCircle } from '@ng-icons/lucide';

@Component({
  imports: [NgIcon],
  providers:[provideIcons({
    lucideArrowUpRight,
    lucideInstagram,
    lucideFacebook,
    lucideLinkedin,
    lucideMessageCircle,
  })],
  selector: 'app-footer',
  styleUrl: './footer.component.css',
  templateUrl: './footer.component.html',
})
export class FooterComponent {}
