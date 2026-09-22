import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [HeaderComponent, RouterOutlet],
  selector: 'app-main-layout',
  styleUrl: './main-layout.component.css',
  templateUrl: './main-layout.component.html',
})
export class MainLayoutComponent {}
