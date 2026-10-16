import {
  DestroyRef,
  ElementRef,
  afterNextRender,
  Component,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowRight, lucideMaximize2, lucideMessageCircle, lucideX } from '@ng-icons/lucide';
import type { ScrollTrigger as ScrollTriggerType } from 'gsap/ScrollTrigger';
import { GsapService } from '../../../core/gsap.service';
import { RevealDirective } from '../../../core/reveal.directive';
import { MeetingDialogService } from '../../../shared/components/services/meeting-dialog.service';

export interface WorkflowCase {
  name: string;
  description: string;
  tags: string[];
  image: string;
  alt: string;
  width: number;
  height: number;
  highlight?: { title: string; caption: string };
}

@Component({
  selector: 'app-workflows',
  imports: [NgIcon, RevealDirective],
  providers: [provideIcons({ lucideArrowRight, lucideMaximize2, lucideMessageCircle, lucideX })],
  templateUrl: './workflows.component.html',
  styleUrl: './workflows.component.css',
})
export class WorkflowsComponent {
  private readonly gsapService = inject(GsapService);
  private readonly meetingDialogService = inject(MeetingDialogService);
  private readonly destroyRef = inject(DestroyRef);

  private readonly root = viewChild.required<ElementRef<HTMLElement>>('root');
  private readonly pin = viewChild.required<ElementRef<HTMLElement>>('pin');
  private readonly track = viewChild.required<ElementRef<HTMLElement>>('track');
  private readonly viewer = viewChild.required<ElementRef<HTMLDialogElement>>('viewer');

  private scrollTrigger?: ScrollTriggerType;
  private destroyed = false;

  /** true mientras la sección está anclada con scroll horizontal (solo desktop sin reduced-motion). */
  public readonly pinned = signal(false);
  public readonly active = signal(0);
  public readonly viewing = signal<WorkflowCase | null>(null);

  public readonly cases: WorkflowCase[] = [
    {
      name: 'GRIN',
      description:
        'Automatización del proceso de pedidos y seguimiento desde el primer contacto hasta las diferentes condiciones del proceso.',
      tags: ['WhatsApp', 'Condiciones', 'Seguimiento'],
      image: '/flujos/grin.webp',
      alt: 'Workflow de automatización GRIN',
      width: 1919,
      height: 941,
      highlight: { title: 'WhatsApp + Workflow', caption: 'Automatización comercial' },
    },
    {
      name: 'OPCIÓN',
      description:
        'Un flujo conectado para manejar cotizaciones, cálculos y conversaciones de manera automática.',
      tags: ['Cotización', 'Calculadora', 'Conversación'],
      image: '/flujos/opcion.webp',
      alt: 'Workflow de automatización OPCIÓN',
      width: 1912,
      height: 941,
    },
    {
      name: 'TIS',
      description:
        'Sistema diseñado para calificar prospectos, gestionar citas y activar acciones de remarketing.',
      tags: ['IA', 'Agendamiento', 'Remarketing'],
      image: '/flujos/tis.webp',
      alt: 'Workflow de automatización TIS',
      width: 1919,
      height: 941,
    },
    {
      name: 'PeruviansEcom',
      description:
        'Automatización del proceso de pedidos, comunicación y seguimiento de clientes desde WhatsApp.',
      tags: ['WhatsApp', 'Pedidos', 'Seguimiento'],
      image: '/flujos/peruvians.webp',
      alt: 'Workflow de automatización PeruviansEcom',
      width: 1919,
      height: 937,
    },
  ];

  constructor() {
    afterNextRender(() => void this.initScroll());
    this.destroyRef.onDestroy(() => {
      this.destroyed = true;
    });
  }

  public openMeetingDialog(): void {
    this.meetingDialogService.requestOpen();
  }

  public goTo(index: number): void {
    const trigger = this.scrollTrigger;
    if (!trigger) return;

    const top = trigger.start + ((trigger.end - trigger.start) * index) / (this.cases.length - 1);
    window.scrollTo({ top, behavior: 'smooth' });
  }

  public openViewer(workflow: WorkflowCase): void {
    this.viewing.set(workflow);
    this.viewer().nativeElement.showModal();
  }

  public closeViewer(): void {
    this.viewer().nativeElement.close();
  }

  public onViewerClosed(): void {
    this.viewing.set(null);
  }

  public onViewerClick(event: MouseEvent): void {
    // Un clic directo sobre el <dialog> (no sobre su contenido) es un clic en el backdrop.
    if (event.target === this.viewer().nativeElement) {
      this.closeViewer();
    }
  }

  private async initScroll(): Promise<void> {
    const kit = await this.gsapService.load();
    if (!kit || this.destroyed) return;

    const { gsap } = kit;
    const root = this.root().nativeElement;
    const pin = this.pin().nativeElement;
    const track = this.track().nativeElement;
    const steps = this.cases.length - 1;

    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      // La clase se aplica de forma síncrona para que ScrollTrigger mida el layout horizontal.
      root.classList.add('is-pinned');
      this.pinned.set(true);

      const tween = gsap.to(track, {
        xPercent: (-100 * steps) / this.cases.length,
        ease: 'none',
        scrollTrigger: {
          trigger: pin,
          start: 'top top',
          end: () => `+=${window.innerHeight * steps * 0.9}`,
          pin: true,
          refreshPriority: 1,
          scrub: 0.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          snap: { snapTo: 1 / steps, duration: { min: 0.2, max: 0.6 }, ease: 'power1.inOut' },
          onUpdate: (self) => {
            root.style.setProperty('--p', String(self.progress));
            const index = Math.round(self.progress * steps);
            if (index !== this.active()) this.active.set(index);
          },
        },
      });

      this.scrollTrigger = tween.scrollTrigger as ScrollTriggerType;

      return () => {
        root.classList.remove('is-pinned');
        root.style.removeProperty('--p');
        this.scrollTrigger = undefined;
        this.pinned.set(false);
        this.active.set(0);
      };
    });

    this.destroyRef.onDestroy(() => mm.revert());
  }
}
