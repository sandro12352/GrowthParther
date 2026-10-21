/**
 * Forma del contenido de una página de servicios. Cada página define sus propios textos con este tipo,
 * dentro de su componente. «draft: true» marca el texto como PROVISIONAL: la página lleva `noindex` para que
 * Google no la indexe; al publicar el texto definitivo, cambiarlo a `false`.
 */
export interface PageContent {
  /** Ruta de la página, sin barra inicial: 'automatizacion' → /automatizacion */
  path: string;
  /** Solo layout 'integration': ilustración de la portada. */
  visual?: 'whatsapp' | 'meta' | 'n8n' | 'ghl';
  /** Solo layout 'integration': cómo se conecta (tres pasos con icono). */
  connection?: { eyebrow: string; title: string; intro: string; nodes: { icon: string; label: string; note: string }[] };
  /** Solo layout 'integration': para quién es la herramienta. */
  audience?: { eyebrow: string; title: string; intro: string; items: string[] };
  /** true mientras el texto sea provisional (aviso visible + noindex). */
  draft: boolean;
  seo: { title: string; description: string };
  hero: {
    eyebrow: string;
    title: string;
    accent: string;
    subtitle: string;
    cta: string;
    /** Diagrama de la portada: pasos del flujo, de arriba abajo. */
    flow?: { icon: string; title: string; text: string }[];
  };
  /** Sección «El problema»; las páginas de integraciones no la usan. */
  problem?: { eyebrow: string; title: string; intro: string; items: { title: string; text: string }[] };
  scope: {
    eyebrow: string;
    title: string;
    accent: string;
    intro: string;
    items: { icon: string; title: string; text: string }[];
  };
  steps: { eyebrow: string; title: string; intro: string; items: { title: string; text: string }[] };
  caseStudy?: {
    eyebrow: string;
    title: string;
    name: string;
    description: string;
    tags: string[];
    image: string;
    alt: string;
    width: number;
    height: number;
  };
  /** Solo layout 'ia': conversación de ejemplo de la portada y reparto de tareas IA / equipo. */
  chat?: { from: 'client' | 'ai'; text: string }[];
  handoff?: { ai: { title: string; items: string[] }; team: { title: string; items: string[] } };
  /** Solo layout 'crm': columnas del tablero de la portada (con contactos de ejemplo) y canales que se conectan. */
  board?: { title: string; cards: { name: string; note: string; tag: string }[] }[];
  channels?: string[];
  faqs: { question: string; answer: string }[];
  cta: { title: string; text: string; button: string };
  /** Slugs de artículos del blog para el bloque «Artículos relacionados» (opcional). */
  relatedPosts?: string[];
  /** Enlaces a otras páginas; solo se muestran los que ya existan. */
  related: { label: string; path: string }[];
}
