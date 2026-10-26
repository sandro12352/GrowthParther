import {
  DestroyRef,
  Directive,
  ElementRef,
  afterNextRender,
  booleanAttribute,
  inject,
  input,
  numberAttribute,
} from '@angular/core';
import { GsapService } from './gsap.service';

export type RevealVariant = 'up' | 'fade' | 'left' | 'right' | 'scale' | 'fan';

const VARIANTS: Record<RevealVariant, gsap.TweenVars> = {
  up: { y: 40, opacity: 0 },
  fade: { opacity: 0 },
  left: { x: -60, opacity: 0 },
  right: { x: 60, opacity: 0 },
  scale: { scale: 0.94, y: 30, opacity: 0 },
  // Abanico: cada hijo parte girado hacia su lado y se asienta en su posición.
  fan: { y: 60, opacity: 0, rotation: (index: number) => (index - 1) * 10, ease: 'back.out(1.3)' },
};

/**
 * Entrada animada al hacer scroll.
 *
 *   <div appReveal>                       → el propio elemento sube y aparece
 *   <div appReveal="left" revealStagger>  → sus hijos directos entran escalonados
 *
 * No hace nada en el servidor ni con `prefers-reduced-motion: reduce`. Usa IntersectionObserver (no ScrollTrigger) para saber cuándo entra en pantalla.
 */
@Directive({ selector: '[appReveal]' })
export class RevealDirective {
  public readonly appReveal = input<RevealVariant | ''>('up');
  public readonly revealStagger = input(false, { transform: booleanAttribute });
  public readonly revealDelay = input(0, { transform: numberAttribute });

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

    const { gsap } = kit;
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const variant = this.appReveal() || 'up';
      const targets = this.revealStagger() ? Array.from(this.host.children) as HTMLElement[] : [this.host];

      // Las clases `transition` de Tailwind pelean con GSAP por opacity/transform: se anulan mientras dura la entrada.
      const release = () => targets.forEach((target) => target.style.removeProperty('transition'));
      targets.forEach((target) => (target.style.transition = 'none'));

      // La animación se crea en pausa (from() deja ya el estado inicial) y se reproduce cuando el elemento entra en pantalla.
      const tween = gsap.from(targets, {
        duration: 0.9,
        ease: 'power3.out',
        delay: this.revealDelay(),
        stagger: targets.length > 1 ? 0.12 : 0,
        ...VARIANTS[variant],
        clearProps: 'transform,opacity,visibility',
        onComplete: release,
        paused: true,
      });

      // IntersectionObserver en lugar de ScrollTrigger: ScrollTrigger mantiene una lista global de disparadores y, al crear uno nuevo,
      // vuelve a calcular los anteriores; con once: true alguno se eliminaba a sí mismo en mitad de ese recorrido y fallaba con
      // «TypeError: Cannot read properties of undefined (reading 'end')» (sobre todo al cambiar de página). Aquí cada elemento es independiente.
      // rootMargin -15 %: se activa cuando el borde superior del elemento llega al 85 % de la altura de la pantalla («top 85%»).
      let done = false;
      let timer: ReturnType<typeof setTimeout> | undefined;
      const stop = () => {
        done = true;
        clearTimeout(timer);
        observer.disconnect();
        fallback.disconnect();
      };
      const play = () => {
        if (done) return;
        stop();
        tween.play();
      };

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (done) return;
            if (entry.isIntersecting) {
              play();
            } else if (entry.boundingClientRect.top < 0) {
              // Ya quedó por encima de la pantalla (p. ej. al recuperar el scroll): se muestra directamente, sin animar.
              stop();
              tween.progress(1, false);
            }
          }
        },
        { rootMargin: '0px 0px -15% 0px', threshold: 0 },
      );

      // Red de seguridad: un elemento tan cerca del final de la página que no puede llegar al 85 % de la altura de la pantalla no
      // activaría nunca el observador anterior y se quedaría invisible. Si lleva un rato visible en pantalla, se anima igualmente.
      const fallback = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) timer ??= setTimeout(play, 700);
            else {
              clearTimeout(timer);
              timer = undefined;
            }
          }
        },
        { threshold: 0 },
      );

      observer.observe(this.host);
      fallback.observe(this.host);

      return () => {
        stop();
        tween.kill();
        release();
      };
    });

    this.destroyRef.onDestroy(() => mm.revert());
  }
}
