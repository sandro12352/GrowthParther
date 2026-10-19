import { Component } from '@angular/core';
import { PageContent } from '../../../shared/models/page-content.model';
import { IntegrationLayoutComponent } from '../integration-layout/integration-layout.component';

// n8n: casi todo PROVISIONAL (solo «Automatizaciones avanzadas» y las ideas de conectar herramientas salen del menú y del FAQ).
const CONTENT: PageContent = {
  path: 'integraciones/n8n',
  visual: 'n8n',
  draft: true,
  seo: {
    title: 'Automatizaciones con n8n | GrowthProject AI',
    description: 'Construimos automatizaciones avanzadas con n8n que conectan tus herramientas y ejecutan tus procesos de forma automática.',
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
        text: 'PROVISIONAL · Por definir con el equipo: pruebas, puesta en marcha y soporte posterior.',
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
  ],
  cta: {
    title: '¿Qué proceso quieres automatizar?',
    text: 'Cuéntanos qué herramientas usas y diseñamos el flujo juntos.',
    button: 'Solicitar reunión',
  },
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
