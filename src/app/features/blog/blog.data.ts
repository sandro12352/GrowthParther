/**
 * Artículos del blog. Cada artículo es un objeto de `POSTS`: para publicar uno nuevo basta con añadirlo aquí
 * (aparece solo en el listado, en la home y en las rutas prerenderizadas) y poner su portada en public/blog/.
 *
 * Los seis artículos actuales son guías generales basadas en lo que ya dice la web (sin cifras ni casos inventados).
 * `BLOG_DRAFT` en `true` pone `noindex` en las páginas del blog para que Google no las indexe (ahora está en `false`: se indexan).
 * Al añadir un artículo, súmalo también a public/sitemap.xml.
 */
export const BLOG_DRAFT = false;

/** Bloques con los que se escribe el cuerpo de un artículo. */
export type PostBlock =
  | { type: 'h2'; text: string }
  | { type: 'p'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'callout'; text: string };

export interface BlogPost {
  /** Dirección del artículo: /blog/<slug> */
  slug: string;
  category: string;
  /** Fecha de publicación en formato AAAA-MM-DD. */
  date: string;
  readTime: string;
  title: string;
  description: string;
  /** Portada (public/blog/…), 16:9. */
  image: string;
  imageAlt: string;
  body: PostBlock[];
}

/**
 * Portada reducida del artículo (public/blog/<nombre>-<ancho>.webp): 720 para las miniaturas de las tarjetas y 1280 para
 * la portada grande (destacado del listado y cabecera del artículo). El original (`image`) queda como respaldo.
 * Al añadir un artículo, genera los dos tamaños junto a su portada.
 */
export function postImage(post: BlogPost, width: 720 | 1280): string {
  return post.image.replace(/\.webp$/, `-${width}.webp`);
}

const MONTHS = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

/** «2026-09-24» → «24 Sep 2026». */
export function formatPostDate(iso: string): string {
  const [year, month, day] = iso.split('-').map(Number);
  return `${String(day).padStart(2, '0')} ${MONTHS[month - 1]} ${year}`;
}

export const POSTS: BlogPost[] = [
  {
    slug: 'procesos-automatizar',
    category: 'Automatización',
    date: '2026-10-15',
    readTime: '5 min lectura',
    title: '¿Qué procesos de tu empresa deberías automatizar primero?',
    description:
      'Una guía práctica para identificar tareas repetitivas y convertirlas en procesos automáticos que ahorren tiempo a tu equipo.',
    image: '/blog/automatizacion.webp',
    imageAlt: 'Persona frente a una laptop con tareas automáticas conectadas entre sí',
    body: [
      { type: 'p', text: 'Automatizar no significa cambiar toda la empresa de un día para otro. Lo más eficaz es empezar por un proceso concreto, comprobar que funciona y, desde ahí, ir sumando otros. La pregunta es: ¿por cuál empezar?' },
      { type: 'h2', text: 'Empieza por lo que más se repite' },
      { type: 'p', text: 'Las mejores candidatas son las tareas que alguien de tu equipo hace una y otra vez, casi siempre de la misma manera. Cuanto más se repite una tarea, más tiempo recupera automatizarla.' },
      { type: 'callout', text: 'Regla práctica: si una tarea se repite todos los días y se hace siempre igual, probablemente se pueda automatizar.' },
      { type: 'h2', text: 'Cuatro preguntas para elegir' },
      { type: 'ul', items: [
        '¿Con qué frecuencia se hace? Diaria o semanal pesa más que mensual.',
        '¿Tiene reglas claras? Si siempre se decide igual, un sistema puede seguirlas.',
        '¿Afecta a tus clientes? Responder rápido o no olvidar un seguimiento se nota.',
        '¿Hoy depende de una sola persona? Automatizarla reduce el riesgo de que se pierda.',
      ] },
      { type: 'h2', text: 'Ejemplos habituales' },
      { type: 'ul', items: [
        'Responder las preguntas frecuentes de tus canales digitales.',
        'Registrar cada contacto nuevo en el CRM sin copiarlo a mano.',
        'Enviar recordatorios de citas o de pagos.',
        'Dar seguimiento a los prospectos que no respondieron.',
        'Asignar cada lead al asesor que le corresponde.',
      ] },
      { type: 'h2', text: 'Qué dejar para después' },
      { type: 'p', text: 'Las decisiones complejas, los casos delicados y las conversaciones que requieren criterio comercial conviene que sigan en manos de una persona. La automatización se encarga de lo repetitivo para que tu equipo tenga tiempo para eso.' },
      { type: 'h2', text: 'Cómo dar el primer paso' },
      { type: 'ul', items: [
        'Anota las tareas que tu equipo repite cada semana.',
        'Elige una que sea frecuente, con reglas claras y de impacto visible.',
        'Automatízala, revisa cómo funciona y ajusta lo necesario.',
        'Cuando esté estable, pasa a la siguiente.',
      ] },
    ],
  },
  {
    slug: 'ia-atencion-clientes',
    category: 'Inteligencia Artificial',
    date: '2026-10-08',
    readTime: '6 min lectura',
    title: 'Cómo utilizar IA para automatizar la atención de tus clientes',
    description:
      'Descubre cómo integrar inteligencia artificial en tus conversaciones, seguimiento y procesos comerciales.',
    image: '/blog/inteligencia-artificial.webp',
    imageAlt: 'Asistente de inteligencia artificial respondiendo mensajes de clientes',
    body: [
      { type: 'p', text: 'La inteligencia artificial puede encargarse de una parte importante de la atención: responder consultas, recopilar información y ejecutar procesos que ya están definidos. Bien planteada, no reemplaza a tu equipo: le quita lo repetitivo.' },
      { type: 'h2', text: 'Qué puede hacer la IA en la atención' },
      { type: 'ul', items: [
        'Atender y entender la conversación desde el primer mensaje.',
        'Recopilar los datos que necesitas de cada contacto.',
        'Identificar qué prospectos tienen mayor potencial.',
        'Seguir los pasos de un proceso definido de forma consistente.',
      ] },
      { type: 'h2', text: 'Qué debe seguir haciendo una persona' },
      { type: 'p', text: 'Cuando el proceso necesita atención humana o una decisión comercial, la conversación debe pasar a tu equipo. Diseñar bien ese traspaso es tan importante como lo que responde la IA.' },
      { type: 'callout', text: 'La IA atiende lo repetitivo; tu equipo interviene cuando hace falta una persona.' },
      { type: 'h2', text: 'Buenas prácticas para empezar' },
      { type: 'ul', items: [
        'Define el alcance: qué consultas atiende y cuáles se derivan.',
        'Cuida el tono para que suene a tu marca y no a un mensaje genérico.',
        'Prepara siempre una salida a una persona.',
        'Revisa conversaciones reales y mejora el sistema con lo que veas.',
      ] },
      { type: 'h2', text: 'Errores frecuentes' },
      { type: 'ul', items: [
        'Querer que la IA lo responda todo desde el primer día.',
        'No conectar la conversación con el CRM, y perder la información.',
        'Dejarla funcionando sin revisar cómo responde.',
      ] },
      { type: 'p', text: 'El camino más seguro es empezar con un conjunto acotado de consultas, medir cómo funciona y ampliar poco a poco.' },
    ],
  },
  {
    slug: 'crm-seguimiento',
    category: 'CRM',
    date: '2026-10-01',
    readTime: '4 min lectura',
    title: 'Por qué tus leads se pierden aunque tengas un CRM',
    description:
      'Tener un CRM no garantiza un buen seguimiento. Conoce los procesos que necesitas automatizar alrededor de tu equipo comercial.',
    image: '/blog/crm-leads.webp',
    imageAlt: 'Tablero de CRM con leads y oportunidades que se pierden por falta de seguimiento',
    body: [
      { type: 'p', text: 'Muchas empresas tienen un CRM y, aun así, ven cómo se enfrían oportunidades. La herramienta guarda la información, pero no hace el seguimiento por sí sola. Lo que falla casi siempre es el proceso que la rodea.' },
      { type: 'h2', text: 'Dónde se suelen perder los leads' },
      { type: 'ul', items: [
        'Nadie sabe quién debe retomar cada contacto.',
        'Los datos llegan incompletos o desordenados.',
        'No hay una tarea ni un recordatorio con el siguiente paso.',
        'Las etapas del embudo no están claras y cada persona las usa distinto.',
        'La respuesta tarda demasiado y el prospecto pierde el interés.',
      ] },
      { type: 'h2', text: 'Qué conviene automatizar' },
      { type: 'ul', items: [
        'Que cada lead nuevo se registre solo, con sus datos y etiquetas.',
        'Asignar automáticamente cada prospecto al asesor correspondiente.',
        'Crear una tarea de seguimiento cuando pasa cierto tiempo sin respuesta.',
        'Reactivar las conversaciones y oportunidades que quedaron sin respuesta.',
      ] },
      { type: 'callout', text: 'Un CRM ordena la información; la automatización se asegura de que ningún contacto se quede sin siguiente paso.' },
      { type: 'h2', text: 'Por dónde empezar' },
      { type: 'p', text: 'Revisa cuántos contactos de tu CRM llevan tiempo sin movimiento. Esa lista suele mostrar dónde está el hueco del proceso y qué automatizar primero.' },
    ],
  },
  {
    slug: 'whatsapp-automatizado',
    category: 'WhatsApp',
    date: '2026-09-24',
    readTime: '5 min lectura',
    title: 'Cómo automatizar WhatsApp sin perder el toque humano',
    description:
      'La automatización puede responder, calificar y hacer seguimiento sin convertir tus conversaciones en mensajes genéricos.',
    image: '/blog/whatsapp.webp',
    imageAlt: 'Conversación de WhatsApp con respuestas automáticas y seguimiento',
    body: [
      { type: 'p', text: 'WhatsApp es uno de los canales donde más conversaciones comerciales se mantienen. Automatizarlo puede ahorrar mucho tiempo, pero solo funciona si el cliente sigue sintiendo que habla con una empresa atenta y no con un robot.' },
      { type: 'h2', text: 'Qué se puede automatizar' },
      { type: 'ul', items: [
        'La atención inicial y las respuestas a preguntas frecuentes.',
        'La captación de datos del prospecto durante la conversación.',
        'La calificación: saber qué contactos tienen mayor potencial.',
        'Los recordatorios y el seguimiento.',
      ] },
      { type: 'h2', text: 'Cómo mantener el toque humano' },
      { type: 'ul', items: [
        'Escribe mensajes cortos, claros y con tu forma de hablar.',
        'Responde rápido, pero deja que una persona intervenga cuando haga falta.',
        'Personaliza con lo que ya sabes del contacto en lugar de repetir el mismo texto.',
        'Evita enviar mensajes de más: cada mensaje debe tener un motivo.',
      ] },
      { type: 'callout', text: 'Automatizar bien es responder mejor y más rápido, no dejar de conversar.' },
      { type: 'h2', text: 'Un flujo sencillo para empezar' },
      { type: 'ul', items: [
        'Mensaje de bienvenida y pregunta sobre lo que busca la persona.',
        'Recopilación de los datos básicos.',
        'Derivación a un asesor o propuesta de una reunión.',
        'Seguimiento automático si no hay respuesta.',
      ] },
    ],
  },
  {
    slug: 'sistema-seguimiento',
    category: 'Ventas',
    date: '2026-09-17',
    readTime: '7 min lectura',
    title: 'De lead a cliente: cómo construir un sistema de seguimiento',
    description:
      'Un proceso comercial bien diseñado puede hacer que cada oportunidad tenga un siguiente paso claro y medible.',
    image: '/blog/seguimiento.webp',
    imageAlt: 'Embudo de ventas con etapas de lead a cliente y tareas de seguimiento',
    body: [
      { type: 'p', text: 'Convertir un contacto en cliente rara vez ocurre en un solo mensaje. Casi siempre hace falta una secuencia de pasos, y un sistema de seguimiento es lo que evita que alguno se olvide.' },
      { type: 'h2', text: '1. Define las etapas' },
      { type: 'p', text: 'Empieza con pocas etapas y que todos entiendan igual: por ejemplo, nuevo contacto, en conversación, calificado y reunión agendada. Cada contacto debe estar siempre en una etapa.' },
      { type: 'h2', text: '2. Asigna un siguiente paso' },
      { type: 'p', text: 'Cada oportunidad necesita saber qué viene después y quién se encarga. Si no hay un siguiente paso, el contacto se enfría.' },
      { type: 'h2', text: '3. Automatiza lo repetitivo' },
      { type: 'ul', items: [
        'El registro del contacto y de sus datos.',
        'Los recordatorios y las tareas de seguimiento.',
        'Los mensajes según lo que haga cada contacto.',
        'La asignación al asesor o equipo correspondiente.',
      ] },
      { type: 'h2', text: '4. Mide para mejorar' },
      { type: 'p', text: 'Fíjate en cuánto tardas en responder, cuántos contactos pasan de una etapa a la siguiente y dónde se quedan atascados. Con esos datos sabrás qué ajustar.' },
      { type: 'callout', text: 'Un buen sistema de seguimiento hace que cada oportunidad tenga un siguiente paso claro y medible.' },
    ],
  },
  {
    slug: 'integraciones',
    category: 'Integraciones',
    date: '2026-09-10',
    readTime: '5 min lectura',
    title: 'Cómo conectar tus herramientas para que trabajen juntas',
    description:
      'CRM, WhatsApp, formularios, IA y otras herramientas pueden formar parte de un mismo sistema.',
    image: '/blog/integraciones.webp',
    imageAlt: 'Herramientas digitales conectadas entre sí en un mismo flujo de automatización',
    body: [
      { type: 'p', text: 'Casi todas las empresas usan varias herramientas: un CRM, WhatsApp, formularios, hojas de cálculo, correo. El problema aparece cuando cada una vive por su cuenta y alguien tiene que pasar los datos a mano de una a otra.' },
      { type: 'h2', text: 'Qué cambia cuando se conectan' },
      { type: 'ul', items: [
        'La información se registra una sola vez y llega sola a donde hace falta.',
        'Tu equipo ve el historial completo de cada contacto.',
        'Las acciones se disparan solas: un mensaje, una tarea, un recordatorio.',
      ] },
      { type: 'h2', text: 'Un ejemplo de flujo conectado' },
      { type: 'ul', items: [
        'Una persona llena un formulario o escribe por un canal.',
        'Su información se guarda en el CRM.',
        'Recibe un mensaje de bienvenida y se le propone una reunión.',
        'Se programa un recordatorio y, si hace falta, un seguimiento.',
      ] },
      { type: 'callout', text: 'No hace falta cambiar todo lo que ya usas: lo habitual es conectar las herramientas que tienes.' },
      { type: 'h2', text: 'Qué tener en cuenta' },
      { type: 'ul', items: [
        'Revisar si las herramientas tienen las conexiones necesarias.',
        'Empezar por un flujo concreto en lugar de conectarlo todo a la vez.',
        'Mantener los datos ordenados para que las conexiones funcionen bien.',
      ] },
    ],
  },
];

export const CATEGORIES = [...new Set(POSTS.map((post) => post.category))];

export function findPost(slug: string | null | undefined): BlogPost | undefined {
  return POSTS.find((post) => post.slug === slug);
}
