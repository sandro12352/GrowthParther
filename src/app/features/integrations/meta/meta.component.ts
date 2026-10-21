import { Component } from '@angular/core';
import { PageContent } from '../../../shared/models/page-content.model';
import { IntegrationLayoutComponent } from '../integration-layout/integration-layout.component';

const CONTENT: PageContent = {
  path: 'integraciones/meta',
  visual: 'meta',
  draft: false,
  seo: {
    title: 'Automatización de Instagram y Facebook | GrowthProject AI',
    description: 'Conectamos los mensajes de Instagram y Facebook a tu CRM y a tus automatizaciones para atender y dar seguimiento a cada prospecto.',
  },
  hero: {
    eyebrow: 'Integraciones · Meta',
    title: 'Instagram y Facebook',
    accent: 'conectados a tu proceso.',
    subtitle: 'Conectamos tus canales de Meta y hacemos que la información continúe automáticamente hacia el CRM y los siguientes pasos del proceso.',
    cta: 'Solicitar reunión',
  },
  scope: {
    eyebrow: 'Qué se puede hacer',
    title: 'Tus redes,',
    accent: 'dentro de tu sistema.',
    intro: 'Dependiendo del objetivo y de las herramientas disponibles, esto es lo que podemos conectar.',
    items: [
      {
        icon: 'lucideMessageCircle',
        title: 'Mensajes de Instagram',
        text: 'Atiende y registra las conversaciones que llegan por Instagram.',
      },
      {
        icon: 'lucideMessageCircle',
        title: 'Mensajes de Facebook',
        text: 'Atiende y registra las conversaciones que llegan por Facebook.',
      },
      { icon: 'lucideUserPlus', title: 'Captación de leads', text: 'Convierte quien te escribe en un contacto dentro de tu sistema.' },
      { icon: 'lucideDatabase', title: 'Información al CRM', text: 'La información continúa automáticamente hacia el CRM.' },
      {
        icon: 'lucideRefreshCw',
        title: 'Seguimiento',
        text: 'Envía recordatorios y seguimientos sin depender de que alguien los haga manualmente.',
      },
      { icon: 'lucideWorkflow', title: 'Siguientes pasos', text: 'El proceso sigue solo: calificación, agendamiento y comunicación.' },
    ],
  },
  connection: {
    eyebrow: 'Cómo se conecta',
    title: 'De tus redes al siguiente paso del proceso',
    intro: 'Cada mensaje entra a tu sistema y dispara lo que corresponda.',
    nodes: [
      { icon: 'lucideSend', label: 'Instagram y Facebook', note: 'Llega el mensaje' },
      { icon: 'lucideBot', label: 'Automatización + IA', note: 'Atiende y clasifica' },
      { icon: 'lucideDatabase', label: 'CRM', note: 'Seguimiento centralizado' },
    ],
  },
  audience: {
    eyebrow: 'Para quién es',
    title: 'Para negocios que reciben mensajes en redes',
    intro: 'Si tus prospectos llegan por Instagram o Facebook, conectamos esos canales a tu proceso para que ningún mensaje se quede sin atender.',
    items: [
      'Negocios que reciben mensajes y consultas por Instagram o Facebook.',
      'Equipos que quieren centralizar en un solo lugar lo que llega de cada red.',
      'Empresas que necesitan que cada contacto pase al CRM y tenga seguimiento.',
    ],
  },
  steps: {
    eyebrow: 'Cómo trabajamos',
    title: 'De tu proceso actual al sistema conectado',
    intro: 'Así empieza un proyecto.',
    items: [
      { title: 'Analizamos tu proceso actual', text: 'Revisamos cómo funciona hoy: captación, atención, seguimiento y herramientas.' },
      {
        title: 'Definimos qué canales conectar',
        text: 'Elegimos qué canales de Meta conectar según el objetivo y las herramientas disponibles.',
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
      question: '¿También pueden automatizar Instagram, Facebook y TikTok?',
      answer: 'Sí. Dependiendo del objetivo y de las herramientas disponibles, podemos conectar diferentes canales y hacer que la información continúe automáticamente hacia el CRM y los siguientes pasos del proceso.',
    },
    {
      question: '¿Pueden conectar las herramientas que ya utiliza mi empresa?',
      answer: 'Sí. Evaluamos las herramientas que utilizas actualmente y, cuando existen las integraciones o conexiones necesarias, podemos incorporarlas dentro del flujo de automatización.',
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
    title: '¿Qué canales quieres conectar?',
    text: 'Cuéntanos por dónde te escriben tus clientes y vemos cómo integrarlos.',
    button: 'Solicitar reunión',
  },
  relatedPosts: ['whatsapp-automatizado', 'integraciones', 'crm-seguimiento'],
  related: [
    { label: 'WhatsApp', path: '/integraciones/whatsapp' },
    { label: 'n8n', path: '/integraciones/n8n' },
    { label: 'GoHighLevel', path: '/integraciones/gohighlevel' },
    { label: 'CRM', path: '/crm' },
  ],
};

@Component({
  selector: 'app-meta',
  imports: [IntegrationLayoutComponent],
  template: `<app-integration-layout [page]="page" />`,
})
export class MetaComponent {
  public readonly page = CONTENT;
}
