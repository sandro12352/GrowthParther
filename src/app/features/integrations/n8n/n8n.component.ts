import { Component } from '@angular/core';
import { PageContent } from '../../../shared/models/page-content.model';
import { IntegrationLayoutComponent } from '../integration-layout/integration-layout.component';

const CONTENT: PageContent = {
  path: 'integraciones/n8n',
  visual: 'n8n',
  draft: false,
  seo: {
    title: 'Automatizaciones con n8n a medida | GrowthProject AI',
    description: 'Construimos flujos con n8n que conectan tus herramientas, ejecutan tareas y usan inteligencia artificial cuando el proceso lo requiere.',
  },
  hero: {
    eyebrow: 'Integraciones · n8n',
    title: 'Automatizaciones avanzadas',
    accent: 'con n8n.',
    subtitle: 'Construimos flujos a la medida que conectan tus herramientas y ejecutan tus procesos de forma automática.',
    cta: 'Solicitar reunión',
  },
  scope: {
    eyebrow: 'Qué se puede hacer',
    title: 'Flujos a la medida,',
    accent: 'sin trabajo manual.',
    intro: 'Algunas de las cosas que construimos con n8n.',
    items: [
      {
        icon: 'lucidePlug',
        title: 'Conectar herramientas',
        text: 'Incorpora al flujo las herramientas que ya utilizas, cuando existen las conexiones necesarias.',
      },
      { icon: 'lucideWorkflow', title: 'Flujos personalizados', text: 'Diseñamos cada flujo a la medida de tu proceso.' },
      { icon: 'lucideZap', title: 'Ejecutar tareas', text: 'Automatiza tareas repetitivas sin intervención manual.' },
      { icon: 'lucideGitBranch', title: 'Condiciones', text: 'El flujo toma caminos distintos según lo que ocurra en cada caso.' },
      {
        icon: 'lucideDatabase',
        title: 'Mover información',
        text: 'Hace que los datos continúen automáticamente hacia el paso siguiente.',
      },
      { icon: 'lucideBot', title: 'Con IA', text: 'Incorpora inteligencia artificial dentro del flujo cuando el proceso lo requiere.' },
    ],
  },
  connection: {
    eyebrow: 'Cómo se conecta',
    title: 'Un flujo que une tus herramientas',
    intro: 'n8n actúa como el punto donde se conectan las piezas de tu proceso.',
    nodes: [
      { icon: 'lucideZap', label: 'Algo ocurre', note: 'Un mensaje, un formulario, una fecha' },
      { icon: 'lucideGitBranch', label: 'n8n procesa', note: 'Reglas, condiciones, IA' },
      { icon: 'lucideSend', label: 'Se ejecuta', note: 'Cada herramienta hace su parte' },
    ],
  },
  audience: {
    eyebrow: 'Para quién es',
    title: 'Para procesos que necesitan algo a la medida',
    intro: 'Cuando un proceso no cabe en una configuración estándar, construimos el flujo según cómo trabaja tu negocio.',
    items: [
      'Empresas que usan varias herramientas y quieren que se hablen entre sí.',
      'Procesos con condiciones o pasos propios que requieren un flujo personalizado.',
      'Equipos que quieren dejar de mover información a mano de una herramienta a otra.',
    ],
  },
  steps: {
    eyebrow: 'Cómo trabajamos',
    title: 'De tu proceso actual al sistema conectado',
    intro: 'Así empieza un proyecto.',
    items: [
      { title: 'Analizamos tu proceso actual', text: 'Revisamos cómo funciona hoy: captación, atención, seguimiento y herramientas.' },
      { title: 'Identificamos qué conectar', text: 'Definimos qué tareas pueden automatizarse y qué herramientas intervienen.' },
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
      question: '¿Qué tipo de procesos pueden automatizar?',
      answer: 'Podemos automatizar tareas repetitivas relacionadas con captación de leads, respuestas, seguimiento, calificación, actualización del CRM, agendamiento, recordatorios, reactivación y comunicación.',
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
    title: '¿Qué proceso quieres automatizar?',
    text: 'Cuéntanos qué herramientas usas y diseñamos el flujo juntos.',
    button: 'Solicitar reunión',
  },
  relatedPosts: ['integraciones', 'procesos-automatizar', 'ia-atencion-clientes'],
  related: [
    { label: 'WhatsApp', path: '/integraciones/whatsapp' },
    { label: 'Meta', path: '/integraciones/meta' },
    { label: 'GoHighLevel', path: '/integraciones/gohighlevel' },
    { label: 'CRM', path: '/crm' },
  ],
};

@Component({
  selector: 'app-n8n',
  imports: [IntegrationLayoutComponent],
  template: `<app-integration-layout [page]="page" />`,
})
export class N8nComponent {
  public readonly page = CONTENT;
}
