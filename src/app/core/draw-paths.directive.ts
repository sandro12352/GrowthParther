import { DestroyRef, Directive, ElementRef, afterNextRender, inject, input } from '@angular/core';
import { GsapService } from './gsap.service';

/**
 * Anima los <path> de un <svg>.
 *
 *   <svg appDrawPaths>        → las líneas se dibujan al entrar en pantalla
 *   <svg appDrawPaths="fade" → líneas ya punteadas: aparecen con un fade escalonado, sin movimiento
 *
 * No hace nada en el servidor ni con `prefers-reduced-motion: reduce`.
 */
@Directive({ selector: 'svg[appDrawPaths]' })
export class DrawPathsDirective {
  public readonly appDrawPaths = input<'draw' | 'fade' | ''>('draw');

  private readonly host = inject<ElementRef<SVGSVGElement>>(ElementRef).nativeElement;
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
    const paths = Array.from(this.host.querySelectorAll<SVGPathElement>('path'));
    if (!paths.length) return;

    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      if (this.appDrawPaths() === 'fade') {
        return this.fade(gsap, paths);
      }
      return this.draw(gsap, paths);
    });

    this.destroyRef.onDestroy(() => mm.revert());
  }

  private draw(gsap: typeof import('gsap').gsap, paths: SVGPathElement[]): () => void {
    const reset = () =>
      paths.forEach((path) => {
        path.style.removeProperty('stroke-dasharray');
        path.style.removeProperty('stroke-dashoffset');
      });

    paths.forEach((path) => {
      const length = path.getTotalLength();
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;
    });

    const tween = gsap.to(paths, {
      strokeDashoffset: 0,
      duration: 2.4,
      ease: 'power2.inOut',
      stagger: 0.3,
      onComplete: reset,
      scrollTrigger: { trigger: this.host, start: 'top 85%', once: true },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      reset();
    };
  }

  private fade(gsap: typeof import('gsap').gsap, paths: SVGPathElement[]): () => void {
    const tween = gsap.from(paths, {
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      clearProps: 'opacity',
      scrollTrigger: { trigger: this.host, start: 'top 80%', once: true },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }
}
