import { isPlatformBrowser } from '@angular/common';
import { Component, DestroyRef, PLATFORM_ID, effect, inject, signal } from '@angular/core';
import { whatsappUrl } from '../../core/contact.config';
import { SplashService } from '../../core/splash.service';
import { MeetingDialogService } from '../components/services/meeting-dialog.service';

/**
 * Botón flotante en la esquina inferior derecha (como el globo de WhatsApp de otras webs), con el robot de la marca.
 * Abre el chat de WhatsApp (número en core/contact.config.ts); si todavía no hay número configurado, abre el formulario
 * de «Agendar una reunión». Aparece cuando termina la pantalla de carga.
 * Muestra una etiqueta al pasar el mouse (o enfocarlo con el teclado) y, además, aparece sola unos segundos después de
 * terminar la carga y se queda visible; no abre ninguna ventana por sí sola.
 */
@Component({
  selector: 'app-chat-fab',
  templateUrl: './chat-fab.component.html',
  styleUrl: './chat-fab.component.css',
})
export class ChatFabComponent {
  private readonly meetingDialogService = inject(MeetingDialogService);
  protected readonly splash = inject(SplashService);
  private readonly platformId = inject(PLATFORM_ID);

  /** Dirección de WhatsApp ('' si no hay número). */
  protected readonly whatsapp = whatsappUrl();

  /** true cuando el mensaje se muestra solo (sin mouse encima); una vez activado, no se oculta. */
  protected readonly hint = signal(false);

  constructor() {
    const timers: ReturnType<typeof setTimeout>[] = [];
    inject(DestroyRef).onDestroy(() => timers.forEach(clearTimeout));

    // Cuando termina la pantalla de carga y pasan unos segundos, el mensaje aparece solo y se queda visible.
    let started = false;
    effect(() => {
      if (!this.splash.done() || started || !isPlatformBrowser(this.platformId)) return;
      started = true;
      timers.push(setTimeout(() => this.hint.set(true), 4000));
    });
  }

  protected onClick(event: Event): void {
    if (this.whatsapp) return;   // con número, el enlace abre WhatsApp en otra pestaña
    event.preventDefault();
    this.meetingDialogService.requestOpen();
  }
}
