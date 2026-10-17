import { DestroyRef, Directive, ElementRef, afterNextRender, effect, inject, untracked } from '@angular/core';
import { GsapService } from './gsap.service';
import { SplashService } from './splash.service';

/**
 * Animación de entrada del hero, en una sola línea de tiempo que arranca cuando la cortina de la pantalla
 * de carga ya va saliendo:
 *
 *   etiqueta → titular (cada línea sube desde una máscara) → subtítulo → botones → dashboard
 *   → tarjeta "IA responde" → se dibuja la línea → tarjeta "Workflow activo"
 * y, a la vez, el robot entra desde la derecha.
 *
 * Los elementos se marcan en la plantilla con `data-hero` (fade | line | dash | chip | connector). El CSS global
 * los deja ocultos desde el primer pintado y, si el JavaScript no llegara a ejecutarse, los muestra a los 5 s.
 * Con `prefers-reduced-motion: reduce` no se anima nada.
 */
@Directive({ selector: '[appHeroIntro]' })
export class HeroIntroDirective {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly gsapService = inject(GsapService);
  private readonly splash = inject(SplashService);
  private readonly destroyRef = inject(DestroyRef);

  private timeline?: gsap.core.Timeline;
  private destroyed = false;

  constructor() {
    afterNextRender(() => void this.prepare());

    effect(() => {
      if (this.splash.done()) {
        untracked(() => this.timeline?.play());
      }
    });

    this.destroyRef.onDestroy(() => {
      this.destroyed = true;
      this.timeline?.kill();
    });
  }

  private all(): HTMLElement[] {
    return Array.from(this.host.querySelectorAll<HTMLElement>('[data-hero]'));
  }

  private release(): void {
    this.all().forEach((element) => element.removeAttribute('data-hero'));
  }

  private async prepare(): Promise<void> {
    const kit = await this.gsapService.load();
    if (!kit || this.destroyed) return;

    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.release();
      return;
    }

    const { gsap } = kit;
    const pick = (kind: string) =>
      Array.from(this.host.querySelectorAll<HTMLElement>(`[data-hero="${kind}"]`));

    const [tag, subtitle, buttons] = pick('fade');
    const lines = pick('line');
    const [dashboard] = pick('dash');
    const [firstChip, secondChip] = pick('chip');
    const [connector] = pick('connector');
    const [robot] = pick('robot');
    const everything = this.all();

    const rise = (distance: number) => ({ y: distance, opacity: 0 });
    const settle = (duration: number) => ({ y: 0, opacity: 1, duration, ease: 'power3.out' });
    const chipFrom = { opacity: 0, scale: 0.85, y: 12 };
    const chipTo = { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'back.out(1.6)' };

    const timeline = gsap.timeline({
      paused: true,
      onComplete: () => {
        gsap.set(everything, { clearProps: 'transform,opacity,visibility' });
        this.release();
      },
    });

    if (tag) timeline.fromTo(tag, rise(16), settle(0.7), 0);
    if (lines.length) {
      // El CSS global ya parte de translateY(110%); GSAP lo lee como píxeles ("y"), así que se fuerza a 0 para que
      // solo mande yPercent (si no, la línea se queda desplazada y no se ve hasta el final).
      timeline.fromTo(
        lines,
        { yPercent: 110, y: 0 },
        { yPercent: 0, y: 0, duration: 0.95, ease: 'power4.out', stagger: 0.12 },
        0.08,
      );
    }
    if (subtitle) timeline.fromTo(subtitle, rise(22), settle(0.8), 0.5);
    if (buttons) timeline.fromTo(buttons, rise(22), settle(0.8), 0.65);
    if (dashboard) timeline.fromTo(dashboard, rise(70), settle(1.1), 0.75);
    if (firstChip) timeline.fromTo(firstChip, chipFrom, chipTo, 1.45);
    if (connector) timeline.fromTo(connector, { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: 'power2.inOut' }, 1.75);
    if (secondChip) timeline.fromTo(secondChip, chipFrom, chipTo, 2.15);
    // El robot entra desde la derecha, desde fuera de la pantalla.
    if (robot) {
      timeline.fromTo(robot, { x: '32vw', opacity: 0 }, { x: 0, opacity: 1, duration: 1.2, ease: 'power3.out' }, 0.9);
    }

    this.timeline = timeline;
    // A partir de aquí la animación manda: la red de seguridad del CSS (para cuando no hay JS) debe dejar de actuar,
    // o a los 5 s pisaría las transformaciones de GSAP y los elementos "saltarían" de sitio.
    this.host.setAttribute('data-hero-js', '');

    // Si la pantalla de carga ya terminó (o no se muestra), arranca de inmediato.
    if (this.splash.done()) {
      timeline.play();
    }
  }
}
