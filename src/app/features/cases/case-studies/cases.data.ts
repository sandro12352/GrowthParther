/**
 * Casos reales (workflows construidos). Los usan la sección Workflows del inicio y la página /casos-de-exito.
 * Para añadir un caso: poner su captura en public/flujos/ y añadir un objeto aquí.
 */
export interface WorkflowCase {
  name: string;
  description: string;
  tags: string[];
  image: string;
  alt: string;
  width: number;
  height: number;
  /** Solo lo usa el inicio (tarjeta destacada del primer caso). */
  highlight?: { title: string; caption: string };
}

export const CASES: WorkflowCase[] = [
  {
    name: 'GRIN',
    description:
      'Automatización del proceso de pedidos y seguimiento desde el primer contacto hasta las diferentes condiciones del proceso.',
    tags: ['WhatsApp', 'Condiciones', 'Seguimiento'],
    image: '/flujos/grin.webp',
    alt: 'Workflow de automatización GRIN',
    width: 1919,
    height: 941,
    highlight: { title: 'WhatsApp + Workflow', caption: 'Automatización comercial' },
  },
  {
    name: 'OPCIÓN',
    description: 'Un flujo conectado para manejar cotizaciones, cálculos y conversaciones de manera automática.',
    tags: ['Cotización', 'Calculadora', 'Conversación'],
    image: '/flujos/opcion.webp',
    alt: 'Workflow de automatización OPCIÓN',
    width: 1912,
    height: 941,
  },
  {
    name: 'TIS',
    description: 'Sistema diseñado para calificar prospectos, gestionar citas y activar acciones de remarketing.',
    tags: ['IA', 'Agendamiento', 'Remarketing'],
    image: '/flujos/tis.webp',
    alt: 'Workflow de automatización TIS',
    width: 1919,
    height: 941,
  },
  {
    name: 'PeruviansEcom',
    description: 'Automatización del proceso de pedidos, comunicación y seguimiento de clientes desde WhatsApp.',
    tags: ['WhatsApp', 'Pedidos', 'Seguimiento'],
    image: '/flujos/peruvians.webp',
    alt: 'Workflow de automatización PeruviansEcom',
    width: 1919,
    height: 937,
  },
];
