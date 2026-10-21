import { Component } from '@angular/core';
import { PageContent } from '../../../shared/models/page-content.model';
import { IntegrationLayoutComponent } from '../integration-layout/integration-layout.component';

const CONTENT: PageContent = {
  path: 'integraciones/gohighlevel',
  visual: 'ghl',
  draft: false,
  seo: {
    title: 'GoHighLevel: CRM y workflows | GrowthProject AI',
    description: 'Trabajamos con GoHighLevel para estructurar CRM, workflows, automatizaciones, conversaciones, seguimiento y oportunidades.',
  },
  hero: {
    eyebrow: 'Integraciones · GoHighLevel',
    title: 'Trabajamos con GoHighLevel',
    accent: 'para ordenar tu proceso comercial.',
    subtitle: 'Estructuramos CRM, workflows, automatizaciones, conversaciones, seguimiento, oportunidades y diferentes procesos comerciales.',
    cta: 'Solicitar reunión',
  },
  scope: {
    eyebrow: 'Qué se puede hacer',
    title: 'Todo tu proceso comercial,',
    accent: 'en una sola plataforma.',
    intro: 'Esto es lo que estructuramos con GoHighLevel.',
    items: [
      { icon: 'lucideDatabase', title: 'CRM', text: 'Centraliza información, etiquetas, oportunidades y tareas automáticamente.' },
      { icon: 'lucideWorkflow', title: 'Workflows', text: 'Flujos que ejecutan tareas, seguimientos y acciones automáticamente.' },
      { icon: 'lucideZap', title: 'Automatizaciones', text: 'Automatiza las tareas repetitivas de tu proceso comercial.' },
      { icon: 'lucideMessageCircle', title: 'Conversaciones', text: 'Guarda el historial de cada conversación junto al contacto.' },
      { icon: 'lucideRefreshCw', title: 'Seguimiento', text: 'Mantiene visibles las tareas y los próximos pasos con cada contacto.' },
      { icon: 'lucideTarget', title: 'Oportunidades', text: 'Muestra en qué etapa está cada oportunidad comercial.' },
    ],
  },
  connection: {
    eyebrow: 'Cómo se conecta',
    title: 'Tus canales, conectados al CRM',
    intro: 'La información llega a un solo lugar y las automatizaciones hacen el resto.',
    nodes: [
      { icon: 'lucideMessageCircle', label: 'Tus canales', note: 'WhatsApp, redes, email' },
      { icon: 'lucideWorkflow', label: 'Workflows', note: 'Automatizan el proceso' },
      { icon: 'lucideDatabase', label: 'CRM', note: 'Contactos y oportunidades' },
    ],
  },
  audience: {
    eyebrow: 'Para quién es',
    title: 'Para negocios que quieren ordenar su proceso comercial',
    intro: 'Si tus contactos, conversaciones y oportunidades están repartidos, los estructuramos en un solo sistema.',
    items: [
      'Negocios que gestionan leads y oportunidades en varios lugares a la vez.',
      'Equipos que quieren ver el historial de cada contacto y el estado de cada oportunidad.',
      'Empresas que quieren apoyar su seguimiento comercial con workflows y automatizaciones.',
    ],
  },
  steps: {
    eyebrow: 'Cómo trabajamos',
    title: 'De tu proceso actual al sistema conectado',
    intro: 'Así empieza un proyecto.',
    items: [
      { title: 'Analizamos tu proceso actual', text: 'Revisamos cómo funciona hoy: captación, atención, seguimiento y herramientas.' },
      {
        title: 'Estructuramos tu CRM',
        text: 'Trabajamos sobre las herramientas que ya utilizas o te ayudamos a estructurar un sistema centralizado.',
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
      question: '¿Trabajan con GoHighLevel?',
      answer: 'Sí. Podemos trabajar con GoHighLevel para estructurar CRM, workflows, automatizaciones, conversaciones, seguimiento, oportunidades y diferentes procesos comerciales.',
    },
    {
      question: '¿Necesito tener un CRM para trabajar con ustedes?',
      answer: 'No necesariamente. Podemos trabajar sobre herramientas que ya utilizas o ayudarte a estructurar un sistema centralizado para gestionar leads, conversaciones, oportunidades y seguimiento.',
    },
    {
      question: '¿Pueden conectar las herramientas que ya utiliza mi empresa?',
      answer: 'Sí. Evaluamos las herramientas que utilizas actualmente y, cuando existen las integraciones o conexiones necesarias, podemos incorporarlas dentro del flujo de automatización.',
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
    title: '¿Quieres ordenar tu proceso comercial?',
    text: 'Cuéntanos cómo trabajas hoy y vemos cómo estructurarlo.',
    button: 'Solicitar reunión',
  },
  relatedPosts: ['crm-seguimiento', 'sistema-seguimiento', 'integraciones'],
  related: [
    { label: 'WhatsApp', path: '/integraciones/whatsapp' },
    { label: 'Meta', path: '/integraciones/meta' },
    { label: 'n8n', path: '/integraciones/n8n' },
    { label: 'CRM', path: '/crm' },
  ],
};

@Component({
  selector: 'app-gohighlevel',
  imports: [IntegrationLayoutComponent],
  template: `<app-integration-layout [page]="page" />`,
})
export class GohighlevelComponent {
  public readonly page = CONTENT;
}
