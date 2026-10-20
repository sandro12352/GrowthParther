/**
 * Casos reales (workflows construidos). Los usan la sección Workflows del inicio y la página /casos-de-exito.
 * Para añadir un caso: poner su captura en public/flujos/ y añadir un objeto aquí.
 */
/** Escena sin fondo de un caso (se anima en la página de casos). Las medidas están en píxeles de la imagen del teléfono. */
export interface CaseScene {
  /** Imagen del teléfono con fondo transparente (public/cases/cutout/). */
  phone: string;
  alt: string;
  width: number;
  height: number;
  /** Ideas conectadas: posición y tamaño de cada tarjeta, con su icono de Lucide y su texto. */
  cards: { x: number; y: number; w: number; h: number; icon: string; label: string }[];
  /** Una línea por tarjeta: nace en `to` (el teléfono) y termina en `from` (la tarjeta); c1 y c2 son los puntos de la curva. */
  lines: { from: [number, number]; c1: [number, number]; c2: [number, number]; to: [number, number] }[];
}

export interface WorkflowCase {
  name: string;
  description: string;
  tags: string[];
  image: string;
  /** Logo del cliente (480x240, webp transparente) en public/cases/logos/. */
  logo: string;
  /** El mismo logo centrado en su lienzo, para listas de logos centradas (public/cases/logos/center/). */
  logoCenter: string;
  /** A qué se dedica el cliente, en una frase corta (se muestra junto al logo). */
  about: string;
  alt: string;
  width: number;
  height: number;
  /** Imagen principal del caso: el resultado en acción (public/cases/results/, 10:7). Si no hay, se muestra el workflow. */
  result?: string;
  resultAlt?: string;
  /** Versión sin fondo (teléfono + ideas conectadas) para la página de casos; si existe, reemplaza a `result` allí. El inicio sigue usando `result`. */
  cutout?: CaseScene;
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
    logo: '/cases/logos/grin.webp',
    logoCenter: '/cases/logos/center/grin.webp',
    result: '/cases/results/grin.webp',
    cutout: {
      phone: '/cases/cutout/grin-phone.webp',
      alt: 'Conversación de WhatsApp con respuestas automáticas y un pedido confirmado en GRIN',
      width: 1400,
      height: 860,
      cards: [
        { x: 20, y: 90, w: 340, h: 140, icon: 'lucideMessageCircle', label: 'Mensaje recibido' },
        { x: 1020, y: 192, w: 340, h: 140, icon: 'lucideFileText', label: 'Pedido registrado' },
        { x: 1020, y: 472, w: 340, h: 140, icon: 'lucideTrendingUp', label: 'Seguimiento activo' },
      ],
      lines: [
        { from: [360, 160], c1: [415, 160], c2: [430, 215], to: [480, 222] },
        { from: [1020, 262], c1: [990, 262], c2: [975, 260], to: [942, 256] },
        { from: [1020, 542], c1: [980, 542], c2: [960, 556], to: [918, 558] },
      ],
    },
    resultAlt: 'Conversación de WhatsApp con respuestas automáticas y un pedido confirmado en GRIN',
    about: 'Venta y alquiler de motos eléctricas y scooters',
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
    logo: '/cases/logos/opcion.webp',
    logoCenter: '/cases/logos/center/opcion.webp',
    result: '/cases/results/opcion.webp',
    resultAlt: 'Conversación de WhatsApp con una cotización de fondo colectivo y el cálculo de la cuota en OPCIÓN',
    cutout: {
      phone: '/cases/cutout/opcion-phone.webp',
      alt: 'Conversación de WhatsApp con una cotización de fondo colectivo y el cálculo de la cuota en OPCIÓN',
      width: 1400,
      height: 860,
      cards: [
        { x: 20, y: 90, w: 340, h: 140, icon: 'lucideMessageCircle', label: 'Mensaje recibido' },
        { x: 1020, y: 192, w: 340, h: 140, icon: 'lucideFileText', label: 'Cotización enviada' },
        { x: 1020, y: 472, w: 340, h: 140, icon: 'lucideUser', label: 'Cliente registrado' },
      ],
      lines: [
        { from: [360, 160], c1: [415, 160], c2: [443, 215], to: [493, 222] },
        { from: [1020, 262], c1: [990, 262], c2: [967, 260], to: [934, 256] },
        { from: [1020, 542], c1: [980, 542], c2: [954, 556], to: [912, 558] },
      ],
    },
    about: 'Fondos colectivos para inmuebles, vehículos y equipos',
    alt: 'Workflow de automatización OPCIÓN',
    width: 1912,
    height: 941,
  },
  {
    name: 'TIS',
    description: 'Sistema diseñado para calificar prospectos, gestionar citas y activar acciones de remarketing.',
    tags: ['IA', 'Agendamiento', 'Remarketing'],
    image: '/flujos/tis.webp',
    logo: '/cases/logos/tis.webp',
    logoCenter: '/cases/logos/center/tis.webp',
    result: '/cases/results/tis.webp',
    resultAlt: 'Conversación de WhatsApp que califica a un prospecto y agenda una clase de prueba en TIS',
    cutout: {
      phone: '/cases/cutout/tis-phone.webp',
      alt: 'Conversación de WhatsApp que califica a un prospecto y agenda una clase de prueba en TIS',
      width: 1400,
      height: 860,
      cards: [
        { x: 20, y: 90, w: 340, h: 140, icon: 'lucideMessageCircle', label: 'Mensaje recibido' },
        { x: 1020, y: 192, w: 340, h: 140, icon: 'lucideCalendarCheck', label: 'Clase agendada' },
        { x: 1020, y: 472, w: 340, h: 140, icon: 'lucideTrendingUp', label: 'Seguimiento activo' },
      ],
      lines: [
        { from: [360, 160], c1: [415, 160], c2: [447, 215], to: [497, 222] },
        { from: [1020, 262], c1: [990, 262], c2: [964, 260], to: [931, 256] },
        { from: [1020, 542], c1: [980, 542], c2: [951, 556], to: [909, 558] },
      ],
    },
    about: 'Escuela de taekwondo en Lima',
    alt: 'Workflow de automatización TIS',
    width: 1919,
    height: 941,
  },
  {
    name: 'PeruviansEcom',
    description: 'Automatización del proceso de pedidos, comunicación y seguimiento de clientes desde WhatsApp.',
    tags: ['WhatsApp', 'Pedidos', 'Seguimiento'],
    image: '/flujos/peruvians.webp',
    logo: '/cases/logos/peruviansecom.webp',
    logoCenter: '/cases/logos/center/peruviansecom.webp',
    result: '/cases/results/peruviansecom.webp',
    resultAlt: 'Conversación de WhatsApp con el resumen y la confirmación de un pedido en PeruviansEcom',
    cutout: {
      phone: '/cases/cutout/peruviansecom-phone.webp',
      alt: 'Conversación de WhatsApp con el resumen y la confirmación de un pedido en PeruviansEcom',
      width: 1400,
      height: 860,
      cards: [
        { x: 20, y: 90, w: 340, h: 140, icon: 'lucideMessageCircle', label: 'Mensaje recibido' },
        { x: 1020, y: 192, w: 340, h: 140, icon: 'lucideFileText', label: 'Pedido registrado' },
        { x: 1020, y: 472, w: 340, h: 140, icon: 'lucideTruck', label: 'Seguimiento de envío' },
      ],
      lines: [
        { from: [360, 160], c1: [415, 160], c2: [444, 215], to: [494, 222] },
        { from: [1020, 262], c1: [990, 262], c2: [968, 260], to: [935, 256] },
        { from: [1020, 542], c1: [980, 542], c2: [950, 556], to: [908, 558] },
      ],
    },
    about: 'Ecommerce de productos naturales',
    alt: 'Workflow de automatización PeruviansEcom',
    width: 1919,
    height: 937,
  },
];
