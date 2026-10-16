import { Component, ElementRef, afterNextRender, inject, viewChild } from '@angular/core';
import { GsapService } from '../../core/gsap.service';

const SESSION_KEY = 'shinkia-splash';
const LOCKED_KEYS = new Set([' ', 'PageUp', 'PageDown', 'Home', 'End', 'ArrowUp', 'ArrowDown']);

/**
 * Pantalla de carga: el nombre aparece letra a letra (fade + subida con retraso escalonado) mientras hace zoom out, y una cortina sube para descubrir el hero.
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

  private readonly overlay = viewChild.required<ElementRef<HTMLElement>>('overlay');
  private readonly word = viewChild.required<ElementRef<HTMLElement>>('word');

  /** "Shink" va en oscuro y "IA" en violeta (índices 5 y 6). */
  public readonly letters = 'ShinkIA'.split('');

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
    const word = this.word().nativeElement;
    const letters = overlay.querySelectorAll('.ch');

    this.unlockScroll = this.lockScroll();
    // Si la animación llegara a atascarse, el scroll nunca debe quedar bloqueado.
    window.setTimeout(() => this.finish(), 6000);

    // Zoom out inicial: grande al principio, sin pasarse del ancho de la pantalla.
    const startScale = Math.min(3.2, (window.innerWidth * 0.85) / word.offsetWidth);

    gsap
      .timeline({ onComplete: () => this.finish() })
      .fromTo(word, { scale: startScale }, { scale: 1, duration: 1.3, ease: 'power3.out' }, 0)
      // Cada letra sube y se desvanece hacia dentro, una tras otra, de izquierda a derecha.
      .fromTo(
        letters,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', stagger: 0.07 },
        0.15,
      )
      .to(word, { opacity: 0, y: -12, duration: 0.25, ease: 'power2.in' }, 1.5)
      .to(overlay, { yPercent: -100, duration: 0.75, ease: 'power4.inOut' }, '<0.05');
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
