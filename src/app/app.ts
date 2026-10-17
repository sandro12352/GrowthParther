import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { SplashComponent } from './shared/splash/splash.component';

@Component({
  imports: [RouterOutlet, HeaderComponent, SplashComponent],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('GrowthProject AI');
}
