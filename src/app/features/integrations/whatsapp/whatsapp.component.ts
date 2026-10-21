import { Component } from '@angular/core';
import { PageContent } from '../../../shared/models/page-content.model';
import { IntegrationLayoutComponent } from '../integration-layout/integration-layout.component';

const CONTENT: PageContent = {
  path: 'integraciones/whatsapp',
  visual: 'whatsapp',
  draft: false,
  seo: {
    title: 'Automatización de WhatsApp con IA | GrowthProject AI',
    description: 'Atiende, califica y da seguimiento a tus prospectos por WhatsApp con automatización e IA, y envía cada conversación a tu CRM.',
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
  audience: {
    eyebrow: 'Para quién es',
    title: 'Para negocios que atienden por WhatsApp',
    intro: 'Si tus clientes te escriben por WhatsApp, este flujo ayuda a responder rápido y a no perder el seguimiento.',
    items: [
      'Negocios que reciben consultas de prospectos o clientes por WhatsApp todos los días.',
      'Equipos que quieren responder al instante y calificar contactos sin hacerlo todo a mano.',
      'Empresas que necesitan que cada conversación quede registrada en su CRM.',
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
        text: 'Probamos el flujo antes de activarlo. El tiempo estimado es de 5 a 7 días y después cuentas con soporte 24/7.',
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
    {
      question: '¿Cuánto tarda la implementación?',
      answer: 'El tiempo estimado es de 5 a 7 días. Si necesitas algo más personalizado, el plazo se define contigo.',
    },
    {
      question: '¿Tienen soporte?',
      answer: 'Sí. Contamos con soporte 24/7.',
    },
  ],
  cta: {
    title: '¿Qué quieres automatizar en WhatsApp?',
    text: 'Cuéntanos cómo atiendes hoy a tus clientes y lo vemos juntos.',
    button: 'Solicitar reunión',
  },
  relatedPosts: ['whatsapp-automatizado', 'ia-atencion-clientes', 'sistema-seguimiento'],
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
