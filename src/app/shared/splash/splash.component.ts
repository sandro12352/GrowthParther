import { Component, ElementRef, afterNextRender, inject, viewChild } from '@angular/core';
import { GsapService } from '../../core/gsap.service';
import { SplashService } from '../../core/splash.service';
import { SPLASH_LETTERS, SPLASH_NAME_ASPECT, SPLASH_TEXT_COLOR } from './splash-letters';

const LOCKED_KEYS = new Set([' ', 'PageUp', 'PageDown', 'Home', 'End', 'ArrowUp', 'ArrowDown']);

/**
 * Pantalla de carga: la "G" aparece grande y, debajo, el nombre se escribe letra a letra de izquierda a derecha;
 * después sube una cortina que descubre el hero. La entrada es CSS (ver splash.component.css) y la salida, GSAP.
 * Se renderiza en el HTML del servidor (cubre el hero desde el primer pintado) y,
 * sale en cada carga de la página (también al refrescar); al navegar entre páginas dentro de la web no vuelve a salir,
 * porque la web no se recarga.
 *
 * Importante: NO se oculta la barra de scroll mientras dura. Si apareciera de golpe al terminar,
 * el ancho de la página cambiaría y las posiciones que ScrollTrigger ya midió quedarían desfasadas.
 * En su lugar se bloquea el desplazamiento por eventos.
 */
@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrl: './splash.component.css',
})
export class SplashComponent {
  private readonly gsapService = inject(GsapService);
  private readonly splash = inject(SplashService);

  private readonly overlay = viewChild.required<ElementRef<HTMLElement>>('overlay');
  private readonly logo = viewChild.required<ElementRef<HTMLElement>>('logo');

  public readonly letters = SPLASH_LETTERS;
  public readonly nameAspect = SPLASH_NAME_ASPECT;
  public readonly textColor = SPLASH_TEXT_COLOR;

  private unlockScroll?: () => void;
  private finished = false;

  constructor() {
    afterNextRender(() => void this.play());
  }

  private async play(): Promise<void> {
    const skip =
      document.documentElement.classList.contains('no-splash') ||
      matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (skip) {
      this.finish();
      return;
    }

    // La entrada (CSS) arranca con la clase splash-go, que se pone aquí: Angular ya arrancó e hidrató la página, así que
    // no habrá tareas pesadas que retrasen el primer fotograma y se pierda el inicio del desvanecido. Es antes de cargar GSAP.
    const root = document.documentElement;
    const logoEl = this.logo().nativeElement;
    if (!root.classList.contains('splash-go')) {
      const icon = logoEl.querySelector('img');
      await Promise.race([icon?.decode().catch(() => undefined), new Promise((resolve) => window.setTimeout(resolve, 1200))]);
      // dos fotogramas: que el splash ya esté pintado antes de empezar (si no, se pierde el inicio del desvanecido)
      await new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
      (window as unknown as { __splashGo?: number }).__splashGo = performance.now();
      root.classList.add('splash-go');
    }

    const kit = await this.gsapService.load();
    if (!kit) {
      this.finish();
      return;
    }

    const { gsap } = kit;
    const overlay = this.overlay().nativeElement;
    const logo = this.logo().nativeElement;

    this.unlockScroll = this.lockScroll();
    // Si la animación llegara a atascarse, el scroll nunca debe quedar bloqueado.
    window.setTimeout(() => this.finish(), 6000);

    // La salida se programa respecto al inicio real de la entrada: si Angular tardó en arrancar, no se corta nada.
    const start = (window as unknown as { __splashGo?: number }).__splashGo ?? performance.now();
    const exitAt = Math.max(0, 2.0 - (performance.now() - start) / 1000);

    gsap
      .timeline({ onComplete: () => this.finish() })
      // Pausa breve y sale todo; la cortina sube.
      .to(logo, { opacity: 0, y: -12, duration: 0.25, ease: 'power2.in' }, exitAt)
      .to(overlay, { yPercent: -100, duration: 0.75, ease: 'power4.inOut' }, '<0.05')
      // El hero empieza a entrar cuando la cortina ya va a mitad de camino.
      .add(() => {
        document.documentElement.classList.add('splash-over');
        this.splash.done.set(true);
      }, '-=0.4');
  }

  /** Bloquea el scroll sin tocar la barra (rueda, táctil y teclado). */
  private lockScroll(): () => void {
    const stop = (event: Event) => event.preventDefault();
    const onKey = (event: KeyboardEvent) => {
      if (LOCKED_KEYS.has(event.key)) event.preventDefault();
    };

    window.addEventListener('wheel', stop, { passive: false });
    window.addEventListener('touchmove', stop, { passive: false });
    window.addEventListener('keydown', onKey);

    return () => {
      window.removeEventListener('wheel', stop);
      window.removeEventListener('touchmove', stop);
      window.removeEventListener('keydown', onKey);
    };
  }

  private finish(): void {
    if (this.finished) return;
    this.finished = true;

    this.unlockScroll?.();
    document.documentElement.classList.add('splash-over');
    this.splash.done.set(true);
    this.overlay().nativeElement.style.display = 'none';

    // Seguro adicional: vuelve a medir las animaciones ancladas al scroll.
    void this.gsapService.load().then((kit) => kit?.ScrollTrigger.refresh());
  }
}
