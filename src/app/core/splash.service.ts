import { Injectable, signal } from '@angular/core';

/**
 * Estado de la pantalla de carga inicial.
 * `done` pasa a true cuando la cortina ya va saliendo (o si la pantalla de carga no se muestra):
 * es la señal para que el hero empiece su animación de entrada.
 */
@Injectable({ providedIn: 'root' })
export class SplashService {
  public readonly done = signal(false);
}
