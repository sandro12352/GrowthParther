import { DestroyRef, Directive, ElementRef, afterNextRender, inject } from '@angular/core';
import { GsapService } from './gsap.service';

/**
 * Animación en secuencia para diagramas y líneas de tiempo, al entrar en pantalla (una sola vez).
 *
 * Marca dentro del contenedor, en el orden en que deben aparecer:
 *   data-seq="item"    → un bloque que sube y aparece
 *   data-seq="line-x"  → una línea horizontal que se dibuja de izquierda a derecha
 *   data-seq="line-y"  → una línea vertical que se dibuja de arriba abajo
 *   data-long          → (con una línea) en vez de esperar su turno, se dibuja durante toda la secuencia
 *
 * El CSS global (styles.css) los deja ocultos desde el primer pintado y, si el JS no llegara a ejecutarse,
 * los muestra a los 5 s. Con `prefers-reduced-motion: reduce` no se anima nada.
 */
@Directive({ selector: '[appSequence]' })
export class SequenceDirective {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly gsapService = inject(GsapService);
  private readonly destroyRef = inject(DestroyRef);
  private destroyed = false;

  constructor() {
    afterNextRender(() => void this.init());
    this.destroyRef.onDestroy(() => {
      this.destroyed = true;
    });
  }

  private async init(): Promise<void> {
    const kit = await this.gsapService.load();
    if (!kit || this.destroyed) return;

    const elements = Array.from(this.host.querySelectorAll<HTMLElement>('[data-seq]'));
    if (!elements.length) return;

    const release = () => elements.forEach((element) => element.removeAttribute('data-seq'));

    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      release();
      return;
    }

    const { gsap } = kit;
    const STEP = 0.28;
    const total = elements.filter((element) => !element.hasAttribute('data-long')).length * STEP + 0.3;

    const timeline = gsap.timeline({
      scrollTrigger: { trigger: this.host, start: 'top 80%', once: true },
      onComplete: () => {
        gsap.set(elements, { clearProps: 'transform,opacity,visibility' });
        release();
      },
    });

    let time = 0;
    for (const element of elements) {
      const kind = element.dataset['seq'];
      const long = element.hasAttribute('data-long');

      if (kind === 'item') {
        timeline.fromTo(element, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }, time);
        time += STEP;
      } else if (kind === 'line-x' || kind === 'line-y') {
        const axis = kind === 'line-x' ? 'scaleX' : 'scaleY';
        timeline.fromTo(
          element,
          { [axis]: 0 },
          { [axis]: 1, duration: long ? total : 0.3, ease: long ? 'none' : 'power2.inOut' },
          long ? 0 : time,
        );
        if (!long) time += STEP * 0.6;
      }
    }

    // La red de seguridad del CSS (para cuando no hay JS) deja de actuar: ahora manda la animación.
    this.host.setAttribute('data-seq-js', '');
  }
}
