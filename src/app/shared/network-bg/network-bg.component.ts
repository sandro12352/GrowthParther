import { Component, DestroyRef, ElementRef, NgZone, afterNextRender, inject, viewChild } from '@angular/core';

type Rgb = [number, number, number];

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  /** Velocidad base hacia la que vuelve el nodo después de que el cursor lo atrae. */
  bx: number;
  by: number;
  r: number;
  /** 0 = violeta, 1 = cian. */
  tone: number;
}

const VIOLET: Rgb = [124, 108, 255];
const CYAN: Rgb = [0, 242, 254];

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const tint = (t: number): Rgb => [lerp(VIOLET[0], CYAN[0], t), lerp(VIOLET[1], CYAN[1], t), lerp(VIOLET[2], CYAN[2], t)];

/**
 * Fondo tecnológico: una red de nodos que se mueven despacio y se unen con líneas finas cuando están cerca.
 * Con el cursor encima, los nodos cercanos se acercan un poco y se conectan con él.
 *
 * - Va detrás del contenido: se coloca dentro de un contenedor `absolute inset-0 pointer-events-none`.
 * - Solo se anima mientras es visible en pantalla y la pestaña está activa.
 * - Con `prefers-reduced-motion` se pinta un solo fotograma, sin movimiento.
 * - En pantallas pequeñas hay menos nodos y no reacciona al cursor.
 */
@Component({
  selector: 'app-network-bg',
  host: { class: 'pointer-events-none absolute inset-0 block' },
  template: `<canvas #canvas class="block h-full w-full opacity-0 transition-opacity duration-[1600ms]" aria-hidden="true"></canvas>`,
})
export class NetworkBgComponent {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');
  private readonly zone = inject(NgZone);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => this.zone.runOutsideAngular(() => this.start()));
  }

  private start(): void {
    const canvas = this.canvas().nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let nodes: Node[] = [];
    let linkDistance = 150;
    let small = false;

    // posición del cursor en coordenadas de pantalla (se convierte a las del canvas en cada fotograma,
    // así sigue siendo correcta aunque la página se desplace sin mover el mouse)
    let pointer: { x: number; y: number } | null = null;

    const makeNode = (x: number, y: number): Node => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.1 + Math.random() * 0.22;
      const bx = Math.cos(angle) * speed;
      const by = Math.sin(angle) * speed;
      return { x, y, vx: bx, vy: by, bx, by, r: 1.1 + Math.random() * 1.6, tone: Math.random() };
    };

    const resize = () => {
      const nextW = this.host.clientWidth;
      const nextH = this.host.clientHeight;
      if (!nextW || !nextH) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(nextW * dpr);
      canvas.height = Math.round(nextH * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      small = nextW < 768;
      linkDistance = small ? 110 : Math.min(165, Math.max(125, nextW / 9));
      const target = Math.max(small ? 18 : 35, Math.min(small ? 32 : 100, Math.round((nextW * nextH) / (small ? 26000 : 15000))));

      if (nodes.length && w && h) {
        // al cambiar el tamaño se conservan los nodos, reescalando su posición
        for (const node of nodes) {
          node.x *= nextW / w;
          node.y *= nextH / h;
        }
      }
      w = nextW;
      h = nextH;
      while (nodes.length < target) nodes.push(makeNode(Math.random() * w, Math.random() * h));
      if (nodes.length > target) nodes.length = target;
    };

    const update = (dt: number, mx: number, my: number, hasPointer: boolean) => {
      const radius = 210;
      for (const n of nodes) {
        if (hasPointer) {
          const dx = mx - n.x;
          const dy = my - n.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < radius * radius && d2 > 1) {
            const d = Math.sqrt(d2);
            const pull = (1 - d / radius) * 0.045 * dt;
            n.vx += (dx / d) * pull;
            n.vy += (dy / d) * pull;
          }
        }
        // vuelve poco a poco a su velocidad de crucero
        n.vx += (n.bx - n.vx) * 0.02 * dt;
        n.vy += (n.by - n.vy) * 0.02 * dt;
        n.x += n.vx * dt;
        n.y += n.vy * dt;
        if (n.x < 0 || n.x > w) {
          n.vx *= -1;
          n.bx *= -1;
          n.x = Math.min(w, Math.max(0, n.x));
        }
        if (n.y < 0 || n.y > h) {
          n.vy *= -1;
          n.by *= -1;
          n.y = Math.min(h, Math.max(0, n.y));
        }
      }
    };

    const draw = (mx: number, my: number, hasPointer: boolean) => {
      ctx.clearRect(0, 0, w, h);
      const l2 = linkDistance * linkDistance;

      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > l2) continue;
          const alpha = (1 - Math.sqrt(d2) / linkDistance) * 0.3;
          const [r, g, bl] = tint((a.tone + b.tone) / 2);
          ctx.strokeStyle = `rgba(${r | 0},${g | 0},${bl | 0},${alpha.toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      if (hasPointer) {
        const reach = 185;
        for (const n of nodes) {
          const d = Math.hypot(n.x - mx, n.y - my);
          if (d > reach) continue;
          ctx.strokeStyle = `rgba(0,242,254,${((1 - d / reach) * 0.55).toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(mx, my);
          ctx.lineTo(n.x, n.y);
          ctx.stroke();
        }
      }

      for (const n of nodes) {
        const [r, g, b] = tint(n.tone);
        if (n.r > 1.9) {
          ctx.fillStyle = `rgba(${r | 0},${g | 0},${b | 0},0.1)`;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r * 3.4, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = `rgba(${r | 0},${g | 0},${b | 0},0.8)`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const pointerInCanvas = () => {
      if (!pointer || small) return { mx: 0, my: 0, has: false };
      const rect = canvas.getBoundingClientRect();
      const mx = pointer.x - rect.left;
      const my = pointer.y - rect.top;
      return { mx, my, has: mx >= -40 && mx <= w + 40 && my >= -40 && my <= h + 40 };
    };

    let raf = 0;
    let last = 0;
    let inView = true;

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(3, (now - last) / 16.667 || 1);
      last = now;
      const { mx, my, has } = pointerInCanvas();
      update(dt, mx, my, has);
      draw(mx, my, has);
    };

    const run = () => {
      if (reduced || raf || !inView || document.hidden) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };
    const pause = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    resize();
    draw(0, 0, false);
    canvas.style.opacity = '1';

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (reduced) draw(0, 0, false);
    });
    resizeObserver.observe(this.host);

    const intersection = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      inView ? run() : pause();
    });
    intersection.observe(this.host);

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      pointer = { x: event.clientX, y: event.clientY };
    };
    const onLeave = () => {
      pointer = null;
    };
    const onVisibility = () => (document.hidden ? pause() : run());

    if (!reduced) {
      window.addEventListener('pointermove', onMove, { passive: true });
      document.addEventListener('mouseleave', onLeave);
      document.addEventListener('visibilitychange', onVisibility);
      run();
    }

    this.destroyRef.onDestroy(() => {
      pause();
      resizeObserver.disconnect();
      intersection.disconnect();
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('visibilitychange', onVisibility);
    });
  }
}
