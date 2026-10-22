/**
 * Datos de contacto de la empresa (un solo lugar para cambiarlos).
 *
 * WHATSAPP_NUMBER: número con código de país y SIN "+", espacios ni guiones. Ejemplo para Perú: '51987654321'.
 * Mientras esté vacío, el botón flotante del robot abre el formulario de reunión en lugar de WhatsApp,
 * y el icono de WhatsApp del pie de página no apunta a ningún sitio.
 */
export const WHATSAPP_NUMBER = '51992444788';

/** Correo de contacto de la empresa (se muestra en la política de privacidad). */
export const CONTACT_EMAIL = 'growthproject.of@gmail.com';

/** Mensaje que aparece escrito al abrir el chat de WhatsApp (la persona solo tiene que enviarlo). */
export const WHATSAPP_MESSAGE = 'Hola, quiero información sobre automatización para mi negocio.';

/** Dirección de WhatsApp lista para usar, o '' si todavía no hay número configurado. */
export function whatsappUrl(message: string = WHATSAPP_MESSAGE): string {
  return WHATSAPP_NUMBER ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}` : '';
}
