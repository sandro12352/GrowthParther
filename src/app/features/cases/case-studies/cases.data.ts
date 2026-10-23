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

/** Ficha ampliada de un caso. */
export interface CaseDetail {
  /** Nombre completo del cliente, como se presenta en la ficha. */
  name: string;
  /** A qué se dedica y su tamaño, en una línea. */
  context: string;
  challenge: string;
  /** Lo que se construyó: cuatro puntos. */
  built: { title: string; text: string }[];
  /** Valoración propia del equipo (no es un dato medido): nivel en texto y de 1 a 5. Por ahora no se muestra en la página. */
  complexity?: { level: string; score: number };
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
  /**
   * Ficha ampliada del caso (solo la página de casos): el reto, lo que se construyó y el nivel de complejidad.
   * Los datos (oficinas, sedes, plazos…) son los de la ficha de cada cliente; no cambiarlos sin confirmarlos con él.
   */
  detail?: CaseDetail;
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
    detail: {
      name: 'GRIN Perú',
      context: 'Movilidad eléctrica · Venta, alquiler y servicio técnico',
      challenge: 'Consultas de venta, alquiler, distribuidores y soporte llegaban mezcladas por cuatro canales distintos.',
      built: [
        { title: 'Agente omnicanal', text: 'WhatsApp, Instagram, Facebook y TikTok atendidos desde un solo sistema con IA.' },
        { title: 'Comentarios a conversación', text: 'Cada comentario en publicaciones y anuncios recibe respuesta y pasa a chat privado.' },
        { title: 'Clasificación de intención', text: 'La IA separa venta, alquiler, distribuidores y soporte, y enruta a cada equipo.' },
        { title: 'Catálogo y delivery', text: 'Modelos, precios, cobertura y entrega en 24–48 h respondidos al instante.' },
      ],
      complexity: { level: 'Muy alto', score: 5 },
    },
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
    detail: {
      name: 'Opción',
      context: 'Fondos colectivos y financiamiento · 17 oficinas',
      challenge: 'Un alto volumen de consultas sobre programas y cuotas llegaba sin filtro a los asesores de 17 oficinas.',
      built: [
        { title: 'Agente experto en programas', text: 'Responde sobre Automotriz, Inmueble, Pro 21, cuotas y plazos con la información oficial.' },
        { title: 'Precalificación con IA', text: 'Identifica producto, monto, plazo, ciudad y capacidad de cuota antes de pasar al asesor.' },
        { title: 'Enrutamiento por oficina', text: 'Asigna cada prospecto calificado a la oficina más cercana y notifica al asesor responsable.' },
        { title: 'Seguimiento y reactivación', text: 'Secuencias automáticas que recuperan a los prospectos que dejaron de responder.' },
      ],
      complexity: { level: 'Alto', score: 4 },
    },
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
    detail: {
      name: 'TIS Martial Arts',
      context: 'Academia de artes marciales · 5 sedes en Lima',
      challenge: 'Coordinar clases de prueba en 5 sedes con horarios distintos y convertirlas en matrículas.',
      built: [
        { title: 'Agenda inteligente', text: 'Reserva la clase de prueba según sede, disciplina, edad y horario disponible.' },
        { title: 'Confirmación y recordatorios', text: 'Mensajes automáticos antes de la clase para reducir las inasistencias.' },
        { title: 'Embudo a matrícula', text: 'Seguimiento después de la clase que presenta los programas Básico, Premium y Legacy.' },
        { title: 'Control por sede', text: 'Cada prospecto registrado con su sede, etapa y responsable en el CRM.' },
      ],
      complexity: { level: 'Alto', score: 4 },
    },
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
    // Redactada a partir de lo que muestra el caso (chat, resumen del pedido, «Pedido registrado» y «Seguimiento de envío»); sin cifras. Aprobada por el usuario.
    detail: {
      name: 'PeruviansEcom',
      context: 'Ecommerce de productos naturales',
      challenge: 'Los pedidos y las consultas de los clientes llegaban por WhatsApp y había que atenderlos y registrarlos uno por uno.',
      built: [
        { title: 'Atención de pedidos por WhatsApp', text: 'Presenta los productos, resuelve dudas y toma el pedido dentro de la conversación.' },
        { title: 'Resumen y confirmación', text: 'Muestra el detalle y el total del pedido para que el cliente lo confirme.' },
        { title: 'Registro del pedido', text: 'Cada pedido confirmado queda registrado automáticamente.' },
        { title: 'Seguimiento del envío', text: 'Avisa al cliente del envío y le hace seguimiento hasta la entrega.' },
      ],
    },
    alt: 'Workflow de automatización PeruviansEcom',
    width: 1919,
    height: 937,
  },
];
