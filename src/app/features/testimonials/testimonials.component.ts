import { Component } from '@angular/core';
import { RevealDirective } from '../../core/reveal.directive';
import { TESTIMONIALS } from './testimonials.data';

/** Sección de comentarios de clientes (inicio). No se muestra mientras testimonials.data.ts esté vacío. */
@Component({
  selector: 'app-testimonials',
  imports: [RevealDirective],
  templateUrl: './testimonials.component.html',
})
export class TestimonialsComponent {
  public readonly items = TESTIMONIALS;

  /** Para dibujar las 5 estrellas (rellenas hasta la valoración). */
  protected readonly starSlots = [1, 2, 3, 4, 5];

  /** Iniciales para el círculo cuando no hay foto: primera letra de las dos primeras palabras del nombre. */
  protected initials(name: string): string {
    return name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((word) => word.charAt(0).toUpperCase())
      .join('');
  }
}
