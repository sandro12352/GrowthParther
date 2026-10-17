import { Component, ElementRef, afterNextRender, inject, viewChild } from '@angular/core';
import { GsapService } from '../../core/gsap.service';
import { SplashService } from '../../core/splash.service';
import { SPLASH_LETTERS, SPLASH_NAME_ASPECT } from './splash-letters';

const SESSION_KEY = 'shinkia-splash';
const LOCKED_KEYS = new Set([' ', 'PageUp', 'PageDown', 'Home', 'End', 'ArrowUp', 'ArrowDown']);

/**
 * Pantalla de carga: la "G" aparece grande y, debajo, el nombre se escribe letra a letra de izquierda a derecha;
 * después sube una cortina que descubre el hero.
 * Se renderiza en el HTML del servidor (cubre el hero desde el primer pintado) y,
 * una vez vista en la sesión, no se vuelve a mostrar (la oculta un script en index.html).
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

    const kit = await this.gsapService.load();
    if (!kit) {
      this.finish();
      return;
    }

    const { gsap } = kit;
    const overlay = this.overlay().nativeElement;
    const logo = this.logo().nativeElement;
    const icon = logo.querySelector('.splash-icon');
    const letters = logo.querySelectorAll('.splash-letter');

    this.unlockScroll = this.lockScroll();
    // Si la animación llegara a atascarse, el scroll nunca debe quedar bloqueado.
    window.setTimeout(() => this.finish(), 6000);

    // Las letras son imágenes sueltas: se espera a que estén listas para que no "salten" al aparecer.
    const images = Array.from(logo.querySelectorAll('img'));
    await Promise.race([
      Promise.all(images.map((image) => image.decode().catch(() => undefined))),
      new Promise((resolve) => window.setTimeout(resolve, 1500)),
    ]);

    gsap
      .timeline({ onComplete: () => this.finish() })
      // 1) La "G" entra grande y se asienta.
      .fromTo(icon, { opacity: 0, scale: 1.4 }, { opacity: 1, scale: 1, duration: 0.9, ease: 'power3.out' }, 0)
      // 2) El nombre se escribe letra a letra, de izquierda a derecha.
      .fromTo(
        letters,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out', stagger: 0.05 },
        0.55,
      )
      // 3) Pausa breve y sale todo; la cortina sube.
      .to(logo, { opacity: 0, y: -12, duration: 0.25, ease: 'power2.in' }, 2.0)
      .to(overlay, { yPercent: -100, duration: 0.75, ease: 'power4.inOut' }, '<0.05')
      // El hero empieza a entrar cuando la cortina ya va a mitad de camino.
      .add(() => this.splash.done.set(true), '-=0.4');
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
    this.splash.done.set(true);
    this.overlay().nativeElement.style.display = 'none';

    try {
      sessionStorage.setItem(SESSION_KEY, '1');
    } catch {
      /* sessionStorage no disponible: la pantalla se mostrará en cada carga. */
    }

    // Seguro adicional: vuelve a medir las animaciones ancladas al scroll.
    void this.gsapService.load().then((kit) => kit?.ScrollTrigger.refresh());
  }
}
