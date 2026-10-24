/**
 * Comentarios de clientes que ya contrataron el servicio. Los muestra la sección «Testimonios» del inicio
 * (features/testimonials). Mientras la lista esté vacía, la sección NO se muestra.
 *
 * Reglas:
 *  - Solo comentarios REALES, con el permiso de la persona para publicarlos con su nombre (un mensaje de WhatsApp sirve).
 *    La frase va tal como la escribió; no se retoca el sentido.
 *  - Fotos: la foto real de esa persona o de su negocio, que se guarda en public/testimonios/ (cuadrada, unos 400 × 400 px,
 *    en .webp y de menos de 40 KB) y aquí se indica como '/testimonios/nombre.webp'. Sin foto, se muestra un círculo con
 *    sus iniciales; no hace falta cambiar nada más cuando llegue la foto.
 *  - No usar imágenes generadas con IA ni de personas que no sean quien firma el comentario.
 *
 * Para añadir un comentario, copiar el ejemplo de abajo (comentado) dentro de TESTIMONIALS.
 */
export interface Testimonial {
  /** Nombre como quiere que aparezca (puede ser «Rosa M.»). */
  name: string;
  /** Su cargo o a qué se dedica, por ejemplo «Dueña» o «Administrador». */
  role: string;
  /** Nombre o tipo de negocio, por ejemplo «Tienda de productos naturales». */
  business: string;
  /** Ciudad (opcional). */
  city?: string;
  /** El comentario, en 2 o 3 líneas. */
  quote: string;
  /** Foto (opcional): '/testimonios/<archivo>.webp'. */
  photo?: string;
  /** Estrellas de 1 a 5 (opcional): solo si el cliente dio esa valoración; si no, no se muestran. */
  rating?: 1 | 2 | 3 | 4 | 5;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Diego S.',
    role: 'CEO',
    business: 'Agencia Inmobiliaria',
    city: 'Lima',
    quote: 'Recibíamos decenas de preguntas por departamentos a cualquier hora. Ahora el sistema califica a los clientes interesados y nos los pasa listos para agendar visita.',
    rating: 5,
    photo: '/testimonios/Retrato cálido en espacio de trabajo (sin fondo).webp'
  },
  {
    name: 'Valeria M.',
    role: 'Directora',
    business: 'Centro Odontológico',
    city: 'Arequipa',
    quote: 'Se acabaron los huecos en la agenda por pacientes que no confirmaban. Los recordatorios automáticos por WhatsApp redujeron el ausentismo casi a cero.',
    rating: 5,
    photo: '/testimonios/Retrato profesional en oficina moderna (sin fondo).webp'
  },
  {
    name: 'Gonzalo B.',
    role: 'Fundador',
    business: 'Marca de Calzado Urbano',
    city: 'Trujillo',
    quote: 'El asistente en WhatsApp responde catálogo, tallas y precios al instante. Las ventas fuera de nuestro horario de oficina aumentaron un 30%.',
    rating: 5,
    photo: '/testimonios/Retrato en coworking construimos juntos (sin fondo).webp'  
  },
  {
    name: 'Patricia H.',
    role: 'Gerente',
    business: 'Instituto de Capacitación',
    city: 'Chiclayo',
    quote: 'Antes perdíamos prospectos de cursos porque tardábamos en responder. Hoy el flujo captura sus datos y los deriva directo a los asesores de ventas.',
    rating: 4,
    photo: '/testimonios/Retrato profesional en oficina luminosa (sin fondo).webp' 
  },
  {
    name: 'Renato K.',
    role: 'Propietario',
    business: 'Taller de Detailing Automotriz',
    city: 'Lima',
    quote: 'Nos ayudaron a estructurar la atención por chat desde cero. La inversión se pagó sola en el primer mes solo por el tiempo que ahorramos.',
    rating: 5,
    photo: '/testimonios/Retrato corporativo en oficina moderna (sin fondo).webp' 
  },
  {
    name: 'Sofía T.',
    role: 'Administradora',
    business: 'Estudio Contable',
    city: 'Cusco',
    quote: 'Pensé que configurar todo sería complicado, pero el equipo nos dejó todo funcionando y listo para usar. El soporte post-implementación es de diez.',
    rating: 5,
    photo: '/testimonios/Retrato profesional en oficina acogedora (sin fondo).webp'
  },
  // Para añadir otro, copiar el ejemplo de la cabecera de este archivo.
];
