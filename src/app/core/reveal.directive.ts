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
 * No hace nada en el servidor ni con `prefers-reduced-motion: reduce`.
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

      const tween = gsap.from(targets, {
        duration: 0.9,
        ease: 'power3.out',
        delay: this.revealDelay(),
        stagger: targets.length > 1 ? 0.12 : 0,
        ...VARIANTS[variant],
        clearProps: 'transform,opacity,visibility',
        onComplete: release,
        scrollTrigger: { trigger: this.host, start: 'top 85%', once: true },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        release();
      };
    });

    this.destroyRef.onDestroy(() => mm.revert());
  }
}
