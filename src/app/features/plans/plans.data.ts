/**
 * Planes de GrowthProject AI. Contenido tomado de las proformas (octubre 2026): precios, alcance, condiciones de pago y límites.
 * Es la ÚNICA fuente: el inicio (tarjetas), la página de cada plan y la comparación leen de aquí.
 * Si cambia un precio o un alcance, se cambia solo en este archivo (y se actualiza `PRICES_AS_OF` si procede).
 *
 * El plazo de implementación («5 a 7 días») es una estimación de la web y no figura en las proformas.
 */

export interface PlanItem {
  title: string;
  text: string;
  /** Nombre del icono (lucide) con el que se dibuja el punto en la página del plan. */
  icon?: string;
}

export interface PlanPayment {
  rows: { concept: string; when: string; amount: string }[];
  totalLabel: string;
  totalWhen: string;
  total: string;
  note: string;
}

export interface Plan {
  /** Dirección: /planes/<slug> */
  slug: 'basico' | 'comercial' | 'avanzado';
  number: string;
  name: string;
  badge: string;
  featured: boolean;
  tagline: string;
  /** Continúa la frase «Ideal para …». */
  idealFor: string;
  /** Implementación única, en dólares, sin símbolo (formato es: 1.500). */
  setup: string;
  /** Servicio mensual, en dólares. */
  monthly: string;
  /** Texto corto del límite de conversaciones (tarjetas y cabecera). */
  conversations: string;

  seo: { title: string; description: string };

  /** Tarjeta del inicio: resumen de cinco puntos (los tres planes muestran el mismo número, para igualar la altura). */
  card: { includesTitle: string; features: { title: string; detail?: string }[] };

  /** `base`: lo que ya incluye el plan anterior (se muestra como un destacado, no como una tarjeta más). */
  included: { intro: string; base?: PlanItem; items: PlanItem[]; note?: string };
  /** Solo el Plan Avanzado: capacidades adicionales y sus límites. */
  extras?: { title: string; intro: string; items: PlanItem[]; limits: string };
  monthlyService: { intro: string; items: PlanItem[] };
  needs: string[];
  notIncluded: string[];
  payment: PlanPayment;
}

/** Mes de las proformas de las que sale la información. */
export const PRICES_AS_OF = 'octubre 2026';

/**
 * Preguntas frecuentes de los planes. Solo se muestran en /planes (las páginas de cada plan no las llevan: eran las mismas
 * en los tres y alargaban la página).
 */
export const PLANS_FAQS: { question: string; answer: string }[] = [
  {
    question: '¿Qué plan me conviene?',
    answer:
      'El Plan Básico es para pequeños negocios que reciben preguntas repetitivas por WhatsApp. El Comercial, para empresas con equipo comercial que quieren calificar, asignar y dar seguimiento a cada oportunidad. El Avanzado, para inmobiliarias, concesionarios y empresas con procesos de venta complejos, con varios canales e integraciones.',
  },
  {
    question: '¿Cuánto tarda la implementación?',
    answer: 'El tiempo estimado es de 5 a 7 días. Si necesitas algo más personalizado, el plazo se define contigo.',
  },
  {
    question: '¿Cómo se paga?',
    answer:
      'La implementación se paga una sola vez: 50 % al iniciar y 50 % a la entrega final. La mensualidad empieza con la puesta en marcha. Los precios son fijos, en dólares y con IGV incluido.',
  },
  {
    question: '¿Qué cuenta como una conversación?',
    answer:
      'Cada chat con un contacto dentro de una ventana de 24 horas. En el Básico y el Comercial te avisamos al llegar al 80 % del límite y puedes ampliarlo; en el Avanzado las conversaciones son ilimitadas.',
  },
  {
    question: '¿Hay soporte?',
    answer: 'Sí. Tienes soporte técnico en el horario acordado, y tu asistente atiende a tus clientes 24/7.',
  },
];

export const PLANS: Plan[] = [
  {
    slug: 'basico',
    number: '01',
    name: 'Plan Básico',
    badge: 'Simple',
    featured: false,
    tagline: 'Tu asistente de IA atiende WhatsApp 24/7 y ordena tus prospectos.',
    idealFor: 'pequeños negocios que reciben preguntas repetitivas y quieren responder de forma rápida y ordenada.',
    setup: '400',
    monthly: '90',
    conversations: 'Hasta 300 conversaciones al mes',

    seo: {
      title: 'Plan Básico: asistente de IA en WhatsApp | GrowthProject AI',
      description:
        'Asistente de IA en WhatsApp para pequeños negocios: responde 24/7, captura datos y ordena tus prospectos. Implementación US$ 400 y US$ 90 al mes.',
    },

    card: {
      includesTitle: 'Incluye',
      features: [
        { title: 'Asistente de IA entrenado', detail: 'con la información de tu negocio' },
        { title: 'Atención en WhatsApp', detail: 'un canal, 24/7' },
        { title: 'Captura de hasta 4 datos', detail: 'los eliges tú' },
        { title: 'Embudo de hasta 5 etapas', detail: 'sabes en qué punto está cada prospecto' },
        { title: 'Derivación a una persona', detail: 'cuando sea necesario' },
      ],
    },

    included: {
      intro: 'Lo que configuramos y dejamos funcionando en tu negocio, con un solo pago.',
      items: [
        { title: 'Un canal de atención: WhatsApp', icon: 'lucideMessageCircle', text: 'Tu asistente atiende en tu número de WhatsApp Business. Otros canales se cotizan aparte.' },
        { title: 'Asistente de IA entrenado', icon: 'lucideBot', text: 'Lo entrenamos con la información de tu negocio para que responda como lo haría tu equipo.' },
        { title: 'Preguntas frecuentes, servicios, precios y horarios', icon: 'lucideBookOpen', text: 'Cargamos y ordenamos esta información para que el asistente dé respuestas correctas al instante.' },
        { title: 'Captura de hasta 4 datos del prospecto', icon: 'lucideClipboardList', text: 'Tú eliges cuáles. Por ejemplo: nombre, teléfono, servicio de interés y distrito.' },
        { title: 'Embudo comercial de hasta 5 etapas', icon: 'lucideFilter', text: 'Cada prospecto avanza por etapas (nuevo, interesado, cotizado, cerrado…) y sabes en qué punto está.' },
        { title: '1 automatización sencilla', icon: 'lucideWorkflow', text: 'Registra al prospecto, avisa a tu asesor y le hace seguimiento si no responde.' },
        { title: 'Derivación a una persona', icon: 'lucideUserRoundCheck', text: 'Cuando el cliente necesita atención humana, el asistente pasa la conversación a tu equipo.' },
        { title: 'Pruebas, documentación y capacitación', icon: 'lucideGraduationCap', text: 'Probamos todo antes de salir en vivo, te entregamos una guía básica y capacitamos a tu equipo.' },
      ],
    },

    monthlyService: {
      intro: 'Lo que hacemos cada mes para que tu asistente siga funcionando bien.',
      items: [
        { title: 'Hasta 300 conversaciones al mes', icon: 'lucideMessageCircle', text: 'Una conversación es cada chat con un contacto dentro de una ventana de 24 horas. Te avisamos al llegar al 80 % y puedes ampliar.' },
        { title: 'Monitoreo básico', icon: 'lucideActivity', text: 'Revisamos que el asistente y la automatización funcionen correctamente.' },
        { title: 'Corrección de errores', icon: 'lucideWrench', text: 'Si algo de la configuración falla, lo corregimos sin costo adicional.' },
        { title: 'Ajustes menores', icon: 'lucideSettings2', text: 'Actualizamos respuestas, precios u horarios cuando cambien, hasta 5 ajustes al mes.' },
        { title: 'Soporte técnico', icon: 'lucideLifeBuoy', text: 'Atendemos tus consultas en el horario acordado. Tu asistente sigue respondiendo a tus clientes 24/7.' },
      ],
    },


    needs: [
      'Información del negocio, servicios, precios y preguntas frecuentes.',
      'Acceso a tu número de WhatsApp Business.',
      'Los 4 datos que quieres pedir a cada prospecto.',
      'Una persona responsable de recibir las derivaciones.',
    ],

    notIncluded: [
      'Otros canales: Instagram, Facebook o web.',
      'Más de 1 automatización o integraciones con CRM.',
      'Tarifas de WhatsApp (Meta) y licencias externas.',
      'Campañas de publicidad.',
    ],

    payment: {
      rows: [
        { concept: 'Implementación · 1.er pago', when: 'Al iniciar', amount: 'US$ 200' },
        { concept: 'Implementación · 2.º pago', when: 'A la entrega final', amount: 'US$ 200' },
        { concept: 'Servicio mensual (300 conversaciones)', when: 'Desde la puesta en marcha, cada mes', amount: 'US$ 90' },
      ],
      totalLabel: 'Total primer mes',
      totalWhen: 'Implementación + 1.ª mensualidad',
      total: 'US$ 490',
      note: 'Precios fijos en dólares. IGV incluido. El consumo de IA está incluido en el plan.',
    },

  },

  {
    slug: 'comercial',
    number: '02',
    name: 'Plan Comercial',
    badge: 'Recomendado',
    featured: true,
    tagline: 'Convierte consultas en oportunidades comerciales.',
    idealFor: 'empresas con equipo comercial que quieren calificar, asignar y dar seguimiento a cada oportunidad.',
    setup: '750',
    monthly: '180',
    conversations: 'Hasta 1.000 conversaciones al mes',

    seo: {
      title: 'Plan Comercial: califica y da seguimiento a leads | GrowthProject AI',
      description:
        'Asistente de IA que califica prospectos, agenda citas, asigna leads y da seguimiento automático. Implementación US$ 750 y US$ 180 al mes.',
    },

    card: {
      includesTitle: 'Todo el Plan Básico, más:',
      features: [
        { title: 'Calificación avanzada', detail: 'hasta 6 datos por contacto' },
        { title: 'Seguimiento automático', detail: 'de oportunidades y cotizaciones' },
        { title: 'Asignación de leads', detail: 'al asesor que corresponde' },
        { title: 'Agenda de citas', detail: 'con confirmaciones y recordatorios' },
        { title: '1 integración', detail: 'GoHighLevel o n8n' },
      ],
    },

    included: {
      intro: 'Las herramientas para convertir y dar seguimiento a tus oportunidades, además de lo que ya incluye el Plan Básico.',
      base: {
        title: 'Todo lo del Plan Básico',
        text: 'WhatsApp, asistente de IA entrenado, preguntas frecuentes, embudo comercial, derivación a una persona, pruebas y capacitación.',
      },
      items: [
        { title: 'Asistente de IA con calificación avanzada', icon: 'lucideTarget', text: 'Identifica la necesidad del cliente, recopila hasta 6 datos y clasifica el contacto según su interés o intención de compra.' },
        { title: 'Seguimiento automático de oportunidades', icon: 'lucideRefreshCw', text: 'Secuencias para prospectos que no responden, que piden una cotización o que aún no toman una decisión.' },
        { title: 'Automatización de citas comerciales', icon: 'lucideCalendarCheck', text: 'Agenda reuniones desde un calendario integrado, con confirmaciones y recordatorios automáticos.' },
        { title: 'Gestión y asignación de leads', icon: 'lucideUsersRound', text: 'Etiquetas y reglas que envían cada contacto al asesor o responsable que le corresponde.' },
        { title: 'Seguimiento de cotizaciones', icon: 'lucideFileText', text: 'Recordatorios automáticos para quienes recibieron una propuesta y todavía no han respondido.' },
        { title: '1 integración con otras herramientas', icon: 'lucidePlug', text: 'Una integración estándar mediante GoHighLevel o n8n, según viabilidad: Google Sheets, Gmail o un webhook sencillo.' },
        { title: 'Panel de seguimiento comercial', icon: 'lucideChartNoAxesCombined', text: 'Organiza tus oportunidades y muestra indicadores básicos: leads registrados, etapas y citas generadas.' },
      ],
    },

    monthlyService: {
      intro: 'Lo que hacemos cada mes para que tu sistema comercial siga funcionando y mejore.',
      items: [
        { title: 'Hasta 1.000 conversaciones al mes', icon: 'lucideMessageCircle', text: 'Cada chat con un contacto en 24 horas. Te avisamos al llegar al 80 %.' },
        { title: 'Monitoreo de automatizaciones', icon: 'lucideActivity', text: 'Revisamos que seguimientos, citas y asignación de leads funcionen bien.' },
        { title: 'Mantenimiento técnico', icon: 'lucideWrench', text: 'Corregimos errores de configuración y mantenemos activa la integración.' },
        { title: 'Optimización del asistente de IA', icon: 'lucideTrendingUp', text: 'Revisamos conversaciones y mejoramos sus respuestas y su calificación.' },
        { title: 'Mantenimiento del seguimiento', icon: 'lucideRefreshCw', text: 'Actualizamos secuencias, etiquetas y reglas de asignación.' },
        { title: 'Reporte mensual de actividad', icon: 'lucideChartNoAxesCombined', text: 'Leads registrados, avance por etapas y citas generadas en el mes.' },
        { title: 'Ajustes menores', icon: 'lucideSettings2', text: 'Cambios en respuestas, precios u horarios, hasta 10 ajustes al mes.' },
        { title: 'Soporte técnico', icon: 'lucideLifeBuoy', text: 'En el horario acordado. Tu asistente atiende a tus clientes 24/7.' },
      ],
    },


    needs: [
      'Información del negocio, servicios y precios.',
      'Acceso a tu WhatsApp Business.',
      'Los 6 datos y criterios para calificar.',
      'Tus asesores y cómo repartir los leads.',
      'Acceso al calendario y a la herramienta a integrar.',
    ],

    notIncluded: [
      'Otros canales: Instagram, Facebook o web.',
      'Integraciones adicionales o a medida (CRM, APIs).',
      'Tarifas de WhatsApp (Meta) y licencias externas.',
      'Campañas de publicidad.',
    ],

    payment: {
      rows: [
        { concept: 'Implementación · 1.er pago', when: 'Al iniciar', amount: 'US$ 375' },
        { concept: 'Implementación · 2.º pago', when: 'A la entrega final', amount: 'US$ 375' },
        { concept: 'Servicio mensual (1.000 conversaciones)', when: 'Desde la puesta en marcha, cada mes', amount: 'US$ 180' },
      ],
      totalLabel: 'Total primer mes',
      totalWhen: 'Implementación + 1.ª mensualidad',
      total: 'US$ 930',
      note: 'Precios fijos en dólares. IGV incluido. El consumo de IA está incluido en el plan.',
    },

  },

  {
    slug: 'avanzado',
    number: '03',
    name: 'Plan Avanzado',
    badge: 'Integraciones',
    featured: false,
    tagline: 'Conecta tus canales, sistemas y procesos de venta.',
    idealFor: 'inmobiliarias, concesionarios y empresas con procesos de venta complejos.',
    setup: '1.500',
    monthly: '350',
    conversations: 'Conversaciones ilimitadas',

    seo: {
      title: 'Plan Avanzado: canales e integraciones | GrowthProject AI',
      description:
        'Atención multicanal, integración con tus sistemas, flujos con n8n, pagos y automatización posventa. Implementación US$ 1.500 y US$ 350 al mes.',
    },

    card: {
      includesTitle: 'Todo el Plan Comercial, más:',
      features: [
        { title: 'Atención multicanal', detail: 'hasta 3 canales' },
        { title: 'Integración de sistemas', detail: 'hasta 3 sistemas' },
        { title: 'Flujos avanzados', detail: 'con n8n' },
        { title: 'Pasarelas de pago', detail: 'Stripe, Mercado Pago y más' },
        { title: 'Proformas y multimedia', detail: 'documentos, imágenes y audio' },
      ],
    },

    included: {
      intro: 'Canales, integraciones y flujos adaptados a tu negocio, además de lo que ya incluye el Plan Comercial.',
      base: {
        title: 'Todo lo del Plan Comercial',
        text: 'Calificación avanzada, seguimiento automático, agenda de citas, asignación de leads, 1 integración y panel de seguimiento comercial.',
      },
      items: [
        { title: 'Asistente de IA personalizado', icon: 'lucideBot', text: 'Identifica la necesidad del cliente, responde consultas y deriva cada caso al equipo correspondiente.' },
        { title: 'Atención multicanal', icon: 'lucideMessagesSquare', text: 'Centraliza la atención de hasta 3 canales compatibles con un asistente configurado para tu negocio.' },
        { title: 'Automatización comercial integral', icon: 'lucideWorkflow', text: 'Organiza leads, asigna oportunidades, programa seguimientos y reactiva contactos.' },
        { title: 'Gestión y derivación de leads', icon: 'lucideUsersRound', text: 'Distribuye oportunidades según reglas de negocio, equipo, servicio o etapa comercial.' },
        { title: 'Flujos avanzados con n8n', icon: 'lucideZap', text: 'Procesa datos, aplica reglas y conecta acciones entre distintas plataformas.' },
        { title: 'Integración de herramientas', icon: 'lucidePlug', text: 'Conecta hasta 3 sistemas compatibles para sincronizar información y automatizar tareas.' },
        { title: 'Automatización posventa', icon: 'lucideHeartHandshake', text: 'Activa seguimientos, recordatorios y atención posterior a la compra según tus procesos.' },
        { title: 'Reportes e implementación', icon: 'lucideChartNoAxesCombined', text: 'Configura indicadores, realiza pruebas, documenta los flujos y capacita a tu equipo.' },
      ],
      note: 'El alcance final se valida durante el análisis de procesos, canales disponibles y permisos de cada plataforma.',
    },

    extras: {
      title: 'IA, canales e integraciones',
      intro: 'Amplía la atención, conecta sistemas y automatiza más etapas del proceso comercial.',
      items: [
        { title: 'Modelos y proveedores de IA', text: 'Trabajamos con soluciones de IA como OpenAI, Anthropic (Claude) y Google Gemini. La opción se define según las necesidades del negocio y las funciones disponibles.' },
        { title: 'Varias cuentas de WhatsApp', text: 'Se incluye una cuenta sin costo para el cliente. Cada cuenta puede utilizar un número distinto de WhatsApp. Las cuentas adicionales cuestan US$ 10 por cuenta; este importe cubre solo la cuenta, no las integraciones.' },
        { title: 'Derivación de leads entre cuentas', text: 'Podemos configurar el envío o la asignación de leads entre las cuentas y equipos conectados, según reglas comerciales, responsables y etapas del proceso.' },
        { title: 'Integración con redes sociales', text: 'Conexión con Instagram, Facebook y TikTok, según las funciones habilitadas, los permisos y las APIs disponibles de cada plataforma. Se respeta el límite contratado de canales.' },
        { title: 'Pasarelas de pago', text: 'Integraciones con Stripe, Mercado Pago u otras pasarelas compatibles para conectar acciones de pago y automatizaciones, según el alcance y las funciones que permita cada proveedor.' },
        { title: 'Proformas, archivos y multimedia', text: 'La IA puede generar y enviar proformas dinámicas con datos del cliente, además de documentos, imágenes, videos y audios, según el canal, el formato y la configuración.' },
      ],
      limits:
        'El plan contempla hasta 3 canales de comunicación compatibles y hasta 3 sistemas integrados en la implementación inicial. La primera cuenta de WhatsApp está incluida; cada cuenta adicional cuesta US$ 10 por cuenta. Ese cargo no incluye la conexión o configuración de redes sociales, pasarelas de pago ni otros sistemas. Las integraciones dependen del acceso del cliente, las APIs y las funciones disponibles en cada plataforma. Cualquier costo externo o licencia de terceros se revisa antes de la puesta en marcha. Las funciones exactas de mensajería y multimedia dependen de las políticas y límites técnicos de cada canal.',
    },

    monthlyService: {
      intro: 'Mantenimiento, supervisión y mejora continua de los canales, integraciones y procesos implementados.',
      items: [
        { title: 'Conversaciones ilimitadas', icon: 'lucideInfinity', text: 'El asistente atiende sin límite mensual de conversaciones.' },
        { title: 'Monitoreo de automatizaciones', icon: 'lucideActivity', text: 'Revisamos que los flujos, canales e integraciones funcionen correctamente.' },
        { title: 'Mantenimiento preventivo y correctivo', icon: 'lucideWrench', text: 'Prevenimos fallas y corregimos errores de configuración.' },
        { title: 'Optimización comercial', icon: 'lucideTrendingUp', text: 'Mejoramos respuestas, flujos y reglas según los resultados.' },
        { title: 'Supervisión de integraciones', icon: 'lucideLink', text: 'Revisamos la sincronización de información entre sistemas.' },
        { title: 'Reporte mensual de rendimiento', icon: 'lucideChartNoAxesCombined', text: 'Resumen de actividad, oportunidades e indicadores disponibles.' },
        { title: 'Mejoras menores', icon: 'lucideSettings2', text: 'Pequeños ajustes en flujos o respuestas, dentro del alcance contratado.' },
        { title: 'Soporte técnico prioritario', icon: 'lucideLifeBuoy', text: 'Atención de consultas en el horario acordado.' },
      ],
    },


    needs: [
      'Información del negocio y proceso de venta.',
      'Accesos a los canales y sistemas a integrar.',
      'Responsables por área y reglas de derivación.',
      'Una persona que valide las pruebas.',
    ],

    notIncluded: [
      'Más de 3 canales o más de 3 sistemas integrados.',
      'Desarrollo de software a medida.',
      'Tarifas de Meta, licencias y costos de terceros.',
      'Campañas de publicidad y cuentas adicionales.',
    ],

    payment: {
      rows: [
        { concept: 'Implementación · 1.er pago', when: 'Al iniciar', amount: 'US$ 750' },
        { concept: 'Implementación · 2.º pago', when: 'A la entrega final', amount: 'US$ 750' },
        { concept: 'Servicio mensual', when: 'Desde la puesta en marcha, cada mes', amount: 'US$ 350' },
      ],
      totalLabel: 'Total primer mes',
      totalWhen: 'Implementación + 1.ª mensualidad',
      total: 'US$ 1.850',
      note: 'Precios en dólares. IGV incluido. El consumo de IA contemplado en el plan está incluido; tarifas y licencias externas no incluidas.',
    },

  },
];

export function findPlan(slug: string | null | undefined): Plan | undefined {
  return PLANS.find((plan) => plan.slug === slug);
}

/** Filas de la tabla comparativa de /planes: un valor por plan, en el orden de PLANS. «yes» = incluido y «no» = no incluido. */
export type Cell = string | 'yes' | 'no';
export const COMPARISON: { label: string; values: [Cell, Cell, Cell] }[] = [
  { label: 'Implementación única', values: ['US$ 400', 'US$ 750', 'US$ 1.500'] },
  { label: 'Servicio mensual', values: ['US$ 90', 'US$ 180', 'US$ 350'] },
  { label: 'Conversaciones al mes', values: ['300', '1.000', 'Ilimitadas'] },
  { label: 'Canales de atención', values: ['WhatsApp', 'WhatsApp', 'Hasta 3 canales'] },
  { label: 'Asistente de IA entrenado', values: ['yes', 'yes', 'yes'] },
  { label: 'Embudo comercial', values: ['Hasta 5 etapas', 'yes', 'yes'] },
  { label: 'Derivación a una persona', values: ['yes', 'yes', 'yes'] },
  { label: 'Calificación avanzada de leads', values: ['no', 'Hasta 6 datos', 'yes'] },
  { label: 'Seguimiento automático de oportunidades', values: ['no', 'yes', 'yes'] },
  { label: 'Agenda de citas con recordatorios', values: ['no', 'yes', 'yes'] },
  { label: 'Asignación de leads a asesores', values: ['no', 'yes', 'yes'] },
  { label: 'Panel y reporte mensual', values: ['no', 'yes', 'yes'] },
  { label: 'Integraciones', values: ['no', '1 (GoHighLevel o n8n)', 'Hasta 3 sistemas'] },
  { label: 'Flujos avanzados con n8n', values: ['no', 'no', 'yes'] },
  { label: 'Pasarelas de pago', values: ['no', 'no', 'yes'] },
  { label: 'Instagram, Facebook y TikTok', values: ['no', 'no', 'yes'] },
  { label: 'Proformas dinámicas y multimedia', values: ['no', 'no', 'yes'] },
  { label: 'Automatización posventa', values: ['no', 'no', 'yes'] },
  { label: 'Soporte técnico', values: ['Horario acordado', 'Horario acordado', 'Prioritario'] },
];
