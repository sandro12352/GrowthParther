import { Component, DestroyRef, ElementRef, afterNextRender, inject, input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideCalendarCheck,
  lucideCheck,
  lucideCreditCard,
  lucideFileText,
  lucideMessageCircle,
  lucideTrendingUp,
  lucideTruck,
  lucideUser,
} from '@ng-icons/lucide';
import { GsapService } from '../../../../core/gsap.service';
import { CaseScene } from '../cases.data';

/**
 * Escena sin fondo de un caso: el teléfono (imagen) con las ideas conectadas (tarjetas y líneas hechas en código).
 * Al entrar en pantalla, con desvanecido suave: primero el teléfono, luego las conexiones, luego las tarjetas y
 * por último los checks. Con `prefers-reduced-motion` se ve todo de inmediato.
 *
 * Todas las medidas de la escena (tarjetas y líneas) están en el sistema de coordenadas de la imagen del
 * teléfono (width × height) y se escalan con el ancho del contenedor.
 */
@Component({
  selector: 'app-case-scene',
  imports: [NgIcon],
  providers: [
    provideIcons({
      lucideCalendarCheck,
      lucideCheck,
      lucideCreditCard,
      lucideFileText,
      lucideMessageCircle,
      lucideTrendingUp,
      lucideTruck,
      lucideUser,
    }),
  ],
  templateUrl: './case-scene.component.html',
  styleUrl: './case-scene.component.css',
})
export class CaseSceneComponent {
  private static nextId = 0;

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly gsapService = inject(GsapService);
  private readonly destroyRef = inject(DestroyRef);
  private destroyed = false;
  private cleanup?: () => void;

  public readonly scene = input.required<CaseScene>();

  /** Prefijo único para los ids de los degradados de las líneas (varias escenas en la misma página). */
  protected readonly uid = CaseSceneComponent.nextId++;

  constructor() {
    afterNextRender(() => void this.init());
    this.destroyRef.onDestroy(() => {
      this.destroyed = true;
      this.cleanup?.();
    });
  }

  /** Las tarjetas de la izquierda salen desde el teléfono hacia la izquierda y las de la derecha, al revés. */
  protected side(x: number, w: number): 'left' | 'right' {
    return x + w / 2 < this.scene().width / 2 ? 'left' : 'right';
  }

  private async init(): Promise<void> {
    const kit = await this.gsapService.load();
    if (!kit || this.destroyed) return;

    const root = this.host.querySelector<HTMLElement>('.scene');
    if (!root) return;

    const all = Array.from(root.querySelectorAll<HTMLElement | SVGElement>('[data-s]'));
    const release = () => {
      all.forEach((element) => element.removeAttribute('data-s'));
    };

    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      release();
      return;
    }

    const { gsap } = kit;
    const pick = (kind: string) => Array.from(root.querySelectorAll<HTMLElement | SVGElement>(`[data-s="${kind}"]`));
    const phone = pick('phone');
    const paths = pick('path');
    const dots = pick('dot');
    const cards = pick('card');
    const checks = pick('ok');

    const timeline = gsap.timeline({
      scrollTrigger: { trigger: root, start: 'top 68%', once: true },
      // Al terminar NO se limpian los estilos ni se quita la capa propia (will-change): hacerlo obliga al navegador a
      // repintar y recolocar todo un píxel, y se notaba como un pequeño salto al final.
    });
    this.cleanup = () => timeline.scrollTrigger?.kill();

    // Orden: 1) el teléfono, 2) las conexiones, 3) las tarjetas y 4) los checks. Todo con desvanecido suave.
    timeline.fromTo(
      phone,
      { opacity: 0, y: 40, scale: 0.96, transformOrigin: '50% 60%' },
      { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power3.out', force3D: true },
      0,
    );
    timeline.fromTo(paths, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power1.inOut', stagger: 0.1 }, 0.5);
    timeline.fromTo(dots, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power1.inOut', stagger: 0.1 }, 0.5);
    timeline.fromTo(
      cards,
      { opacity: 0, xPercent: (index) => (cards[index].dataset['side'] === 'left' ? 6 : -6), y: 8 },
      { opacity: 1, xPercent: 0, y: 0, duration: 0.4, ease: 'power2.out', stagger: 0.1, force3D: true },
      0.9,
    );
    timeline.fromTo(checks, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power1.inOut', stagger: 0.08 }, 1.4);

    // desde aquí manda GSAP: la red de seguridad del CSS deja de actuar
    root.setAttribute('data-scene-js', '');
  }
}
