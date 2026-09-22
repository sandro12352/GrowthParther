import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCircle, lucideInfo,lucideCalendar,lucideUserRound } from '@ng-icons/lucide';
import { HlmNavigationMenuImports } from '@spartan-ng/helm/navigation-menu';
@Component({
  selector: 'app-header',
  imports: [NgIcon, HlmNavigationMenuImports],
  providers: [provideIcons({
    lucideCircle,
    lucideInfo,
    lucideCalendar,
    lucideUserRound
  })],
  styleUrl: './header.component.css',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
}
