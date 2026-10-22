import { Component, DestroyRef, afterNextRender, inject, signal, viewChild } from '@angular/core';
import type { ScrollStrategy } from '@angular/cdk/overlay';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCircle, lucideInfo,lucideCalendar,lucideUserRound, lucideArrowUpRight, lucideWorkflow, lucideSparkles, lucideDatabase, lucideLink, lucideBot, lucideMenu, lucideSend, lucideMessageCircle, lucideX } from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmNavigationMenuImports } from '@spartan-ng/helm/navigation-menu';
import { HlmSheet, HlmSheetImports } from '@spartan-ng/helm/sheet';
import { whatsappUrl } from '../../core/contact.config';
import { MeetingDialogService } from '../components/services/meeting-dialog.service';
@Component({
  selector: 'app-header',
  imports: [NgIcon, RouterLink, RouterLinkActive, HlmNavigationMenuImports, HlmButtonImports, HlmSheetImports],
  providers: [provideIcons({
    lucideCircle,
    lucideInfo,
    lucideCalendar,
    lucideUserRound,
    lucideArrowUpRight,
    lucideWorkflow,
    lucideSparkles,
    lucideDatabase,
    lucideLink,
    lucideBot,
    lucideMenu,
    lucideSend,
    lucideMessageCircle,
    lucideX,
  })],
  styleUrl: './header.component.css',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  private readonly meetingDialogService = inject(MeetingDialogService);
  private readonly destroyRef = inject(DestroyRef);

  /** true cuando la página ya bajó: el header se acerca al borde superior. */
  public readonly scrolled = signal(false);

  /**
   * Bloqueo de scroll ligero para el menú móvil. El de CDK deja <html> en posición fija, y eso obliga al navegador a
   * recalcular toda la página (en el inicio, muy larga) justo cuando el panel está entrando: se notaba un tirón.
   * Aquí solo se oculta el desborde de <html> y se marca con data-overlay-open (el fondo animado se pausa con esa marca).
   */
  protected readonly sheetScroll: ScrollStrategy = {
    attach: () => undefined,
    enable: () => {
      const root = document.documentElement;
      root.style.overflow = 'hidden';
      root.setAttribute('data-overlay-open', '');
    },
    disable: () => {
      const root = document.documentElement;
      root.style.overflow = '';
      root.removeAttribute('data-overlay-open');
    },
  };

  /** Dirección de WhatsApp del menú móvil ('' si no hay número). */
  protected readonly whatsapp = whatsappUrl();

  /** Enlaces del menú móvil, por grupos. */
  protected readonly mobileGroups = [
    {
      label: 'Soluciones',
      items: [
        { path: '/automatizacion', title: 'Automatización de procesos', text: 'Flujos que ejecutan tareas' },
        { path: '/ia-para-empresas', title: 'IA para empresas', text: 'Asistentes que atienden' },
        { path: '/crm', title: 'CRM', text: 'Leads, clientes y seguimiento' },
      ],
    },
    {
      label: 'Integraciones',
      items: [
        { path: '/integraciones', title: 'Todas las integraciones', text: 'Conecta tus herramientas' },
        { path: '/integraciones/whatsapp', title: 'WhatsApp', text: 'Atención y seguimiento' },
        { path: '/integraciones/meta', title: 'Meta', text: 'Facebook + Instagram' },
        { path: '/integraciones/n8n', title: 'n8n', text: 'Automatizaciones avanzadas' },
        { path: '/integraciones/gohighlevel', title: 'GoHighLevel', text: 'CRM + Workflows' },
      ],
    },
    {
      label: 'Empresa',
      items: [
        { path: '/planes', title: 'Planes', text: 'Precios y qué incluye cada uno' },
        { path: '/casos-de-exito', title: 'Casos de éxito', text: 'Procesos reales' },
        { path: '/blog', title: 'Blog', text: 'Guías de automatización' },
        { path: '/nosotros', title: 'Nosotros', text: 'Quiénes somos' },
      ],
    },
  ];

  private readonly sheet = viewChild(HlmSheet);

  constructor() {
    afterNextRender(() => {
      this.warmUpMobileMenu();

      const update = () => this.scrolled.set(window.scrollY > 40);
      update();
      window.addEventListener('scroll', update, { passive: true });
      this.destroyRef.onDestroy(() => window.removeEventListener('scroll', update));
    });
  }

  /**
   * La primera vez que se abre el menú móvil Angular tiene que crear y preparar todo el panel (unos 100 ms en un
   * móvil lento), justo cuando el panel está entrando: se notaba un tirón. Aquí se abre y se cierra una vez, en
   * reposo, con el contenedor de overlays invisible (data-menu-prewarm, ver styles.css); así al tocar el botón
   * ya está todo preparado. Solo en pantallas donde se ve el botón, con la página arriba y sin animaciones reducidas.
   */
  private warmUpMobileMenu(): void {
    if (!matchMedia('(max-width: 1279px)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const root = document.documentElement;
    const timers: ReturnType<typeof setTimeout>[] = [];
    this.destroyRef.onDestroy(() => timers.forEach(clearTimeout));

    const warm = () => {
      const sheet = this.sheet();
      // Si ya hay un menú o un diálogo abierto (por ejemplo, la persona abrió el menú justo ahora), no se toca nada.
      if (!sheet || window.scrollY > 40 || document.hidden || document.querySelector('hlm-sheet-content, .cdk-overlay-pane:not(:empty)')) return;

      // Si la persona toca el botón del menú mientras corre el calentamiento (unos 0,7 s en toda la visita),
      // se espera a que termine y entonces se le abre el menú: no se pierde su toque.
      let wantsMenu = false;
      const onTap = (event: Event) => {
        if ((event.target as Element | null)?.closest?.('button[aria-label="Abrir menú de navegación"]')) wantsMenu = true;
      };
      document.addEventListener('pointerdown', onTap, true);

      root.setAttribute('data-menu-prewarm', '');
      sheet.open();
      timers.push(
        setTimeout(() => {
          sheet.close();
          timers.push(
            setTimeout(() => {
              document.removeEventListener('pointerdown', onTap, true);
              root.removeAttribute('data-menu-prewarm');
              if (wantsMenu) sheet.open();
            }, 500),
          );
        }, 150),
      );
    };

    // Después de la pantalla de carga y de la animación del hero, y cuando el navegador esté libre.
    timers.push(
      setTimeout(() => {
        const idle = (window as unknown as { requestIdleCallback?: (cb: () => void) => void }).requestIdleCallback;
        idle ? idle(warm) : warm();
      }, 6000),
    );
  }

  public openMeetingDialog(): void {
    this.meetingDialogService.requestOpen();
  }
}
