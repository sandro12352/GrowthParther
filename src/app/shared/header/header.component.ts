import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCircle, lucideInfo,lucideCalendar,lucideUserRound, lucideArrowUpRight, lucideWorkflow, lucideSparkles, lucideDatabase, lucideLink, lucideBot, lucideMenu } from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmNavigationMenuImports } from '@spartan-ng/helm/navigation-menu';
@Component({
  selector: 'app-header',
  imports: [NgIcon, HlmNavigationMenuImports, HlmButtonImports],
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
}
