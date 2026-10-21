import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowUpRight } from '@ng-icons/lucide';
import { whatsappUrl } from '../../core/contact.config';
import { MeetingDialogService } from '../components/services/meeting-dialog.service';

/** Un enlace del pie: lleva a una página (`path`) o abre el formulario de reunión (`action: 'meeting'`). */
interface FooterLink {
  label: string;
  path?: string;
  action?: 'meeting';
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

@Component({
  imports: [NgIcon, RouterLink],
  providers: [
    provideIcons({
      lucideArrowUpRight,
    }),
  ],
  selector: 'app-footer',
  styleUrl: './footer.component.css',
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  private readonly meetingDialogService = inject(MeetingDialogService);

  /** Dirección de WhatsApp para el icono de redes ('' si todavía no hay número). */
  public readonly whatsapp = whatsappUrl();

  /** Columnas de enlaces. Cada ruta debe existir en app.routes.ts. */
  public readonly columns: FooterColumn[] = [
    {
      title: 'Soluciones',
      links: [
        { label: 'Automatización de procesos', path: '/automatizacion' },
        { label: 'IA para empresas', path: '/ia-para-empresas' },
        { label: 'CRM', path: '/crm' },
      ],
    },
    {
      title: 'Integraciones',
      links: [
        { label: 'Todas las integraciones', path: '/integraciones' },
        { label: 'WhatsApp', path: '/integraciones/whatsapp' },
        { label: 'Meta', path: '/integraciones/meta' },
        { label: 'n8n', path: '/integraciones/n8n' },
        { label: 'GoHighLevel', path: '/integraciones/gohighlevel' },
      ],
    },
    {
      title: 'Empresa',
      links: [
        { label: 'Nosotros', path: '/nosotros' },
        { label: 'Casos de éxito', path: '/casos-de-exito' },
        { label: 'Blog', path: '/blog' },
        { label: 'Solicitar reunión', action: 'meeting' },
      ],
    },
  ];

  public openMeetingDialog(): void {
    this.meetingDialogService.requestOpen();
  }
}
