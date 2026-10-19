import { Component } from '@angular/core';
import { PageContent } from '../../../shared/models/page-content.model';
import { IntegrationLayoutComponent } from '../integration-layout/integration-layout.component';

// WhatsApp: tareas y respuesta del FAQ reales; la descripción de «Captación» y el paso 4 son PROVISIONALES.
const CONTENT: PageContent = {
  path: 'integraciones/whatsapp',
  visual: 'whatsapp',
  draft: true,
  seo: {
    title: 'Automatización de WhatsApp | GrowthProject AI',
    description: 'Flujos donde WhatsApp forma parte de la captación, atención, seguimiento, calificación y comunicación automática con tus prospectos o clientes.',
  },
  hero: {
    eyebrow: 'Integraciones · WhatsApp',
    title: 'Automatización de WhatsApp',
    accent: 'para atender y dar seguimiento.',
    subtitle: 'WhatsApp puede formar parte de la captación, atención, seguimiento, calificación y comunicación automática con tus prospectos o clientes.',
    cta: 'Solicitar reunión',
  },
  scope: {
    eyebrow: 'Qué se puede hacer',
    title: 'WhatsApp,',
    accent: 'trabajando todo el día.',
    intro: 'Algunas de las tareas que podemos automatizar con WhatsApp.',
    items: [
      { icon: 'lucideUserPlus', title: 'Captación', text: 'Recibe a tus prospectos desde WhatsApp y registra su información.' },
      {
        icon: 'lucideMessageCircle',
        title: 'Atención inicial',
        text: 'Automatiza respuestas y atención inicial en tus canales digitales.',
      },
      {
        icon: 'lucideRefreshCw',
        title: 'Seguimiento',
        text: 'Envía recordatorios y seguimientos sin depender de que alguien los haga manualmente.',
      },
      { icon: 'lucideUserRoundCheck', title: 'Calificación', text: 'Identifica automáticamente qué contactos tienen mayor potencial.' },
      {
        icon: 'lucideMail',
        title: 'Comunicación automática',
        text: 'Crea secuencias de comunicación según el comportamiento de cada contacto.',
      },
      { icon: 'lucideBellRing', title: 'Recordatorios', text: 'Reduce ausencias y mantén a tus clientes informados automáticamente.' },
    ],
  },
  connection: {
    eyebrow: 'Cómo se conecta',
    title: 'De la conversación al CRM, sin pasos manuales',
    intro: 'La información que llega por WhatsApp continúa sola hacia el resto del proceso.',
    nodes: [
      { icon: 'lucideMessageCircle', label: 'WhatsApp', note: 'Llega la conversación' },
      { icon: 'lucideBot', label: 'Automatización + IA', note: 'Atiende y registra' },
      { icon: 'lucideDatabase', label: 'CRM', note: 'Queda todo centralizado' },
    ],
  },
  steps: {
    eyebrow: 'Cómo trabajamos',
    title: 'De tu proceso actual al sistema conectado',
    intro: 'Así empieza un proyecto.',
    items: [
      { title: 'Analizamos tu proceso actual', text: 'Revisamos cómo funciona hoy: captación, atención, seguimiento y herramientas.' },
      {
        title: 'Definimos el flujo en WhatsApp',
        text: 'Identificamos qué tareas pueden automatizarse y cuándo debe intervenir una persona.',
      },
      {
        title: 'Diseñamos el sistema',
        text: 'Construimos el sistema que mejor se adapte a tu operación, conectado a las herramientas que ya usas.',
      },
      {
        title: 'Probamos y acompañamos',
        text: 'PROVISIONAL · Por definir con el equipo: pruebas, puesta en marcha y soporte posterior.',
      },
    ],
  },
  faqs: [
    {
      question: '¿Trabajan con WhatsApp?',
      answer: 'Sí. Podemos trabajar flujos donde WhatsApp forme parte de la captación, atención, seguimiento, calificación y comunicación automática con tus prospectos o clientes.',
    },
    {
      question: '¿La inteligencia artificial reemplaza a mi equipo comercial?',
      answer: 'La IA puede encargarse de determinadas tareas repetitivas, responder conversaciones, recopilar información y ejecutar procesos definidos. El equipo puede intervenir cuando el proceso necesita atención humana o una decisión comercial.',
    },
    {
      question: '¿Cómo empieza un proyecto de automatización?',
      answer: 'Primero analizamos cómo funciona actualmente tu proceso: captación, atención, seguimiento y herramientas. A partir de ahí identificamos qué tareas pueden automatizarse y diseñamos el sistema que mejor se adapte a tu operación.',
    },
  ],
  cta: {
    title: '¿Qué quieres automatizar en WhatsApp?',
    text: 'Cuéntanos cómo atiendes hoy a tus clientes y lo vemos juntos.',
    button: 'Solicitar reunión',
  },
  related: [
    { label: 'Meta', path: '/integraciones/meta' },
    { label: 'n8n', path: '/integraciones/n8n' },
    { label: 'GoHighLevel', path: '/integraciones/gohighlevel' },
    { label: 'CRM', path: '/crm' },
  ],
};

@Component({
  selector: 'app-whatsapp',
  imports: [IntegrationLayoutComponent],
  template: `<app-integration-layout [page]="page" />`,
})
export class WhatsappComponent {
  public readonly page = CONTENT;
}
