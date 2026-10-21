import { Component, inject } from '@angular/core';
import { whatsappUrl } from '../../core/contact.config';
import { SplashService } from '../../core/splash.service';
import { MeetingDialogService } from '../components/services/meeting-dialog.service';

/**
 * Botón flotante en la esquina inferior derecha (como el globo de WhatsApp de otras webs), con el robot de la marca.
 * Abre el chat de WhatsApp (número en core/contact.config.ts); si todavía no hay número configurado, abre el formulario
 * de «Agendar una reunión». Aparece cuando termina la pantalla de carga.
 * Al pasar el mouse (o enfocarlo con el teclado) muestra una etiqueta; no abre ninguna ventana por sí solo.
 */
@Component({
  selector: 'app-chat-fab',
  templateUrl: './chat-fab.component.html',
  styleUrl: './chat-fab.component.css',
})
export class ChatFabComponent {
  private readonly meetingDialogService = inject(MeetingDialogService);
  protected readonly splash = inject(SplashService);

  /** Dirección de WhatsApp ('' si no hay número). */
  protected readonly whatsapp = whatsappUrl();

  protected onClick(event: Event): void {
    if (this.whatsapp) return;   // con número, el enlace abre WhatsApp en otra pestaña
    event.preventDefault();
    this.meetingDialogService.requestOpen();
  }
}
