import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

/**
 * URL oficial del sitio, SIN barra final (por ejemplo 'https://growthproject.ai').
 * Mientras esté vacía no se emiten `canonical` ni `og:url`, porque se necesita el dominio definitivo.
 */
export const SITE_URL = '';

const SITE_NAME = 'GrowthProject AI';

export interface SeoData {
  title: string;
  description: string;
  /** Ruta de la página ('/automatizacion'). */
  path: string;
  /** true para páginas provisionales: no se indexan. */
  noindex?: boolean;
}

/** Título, descripción y etiquetas para buscadores y redes sociales de cada página. */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  /** Valores de la página de inicio (los de index.html), guardados la primera vez para poder restaurarlos. */
  private defaults?: { title: string; description: string };

  public apply(data: SeoData): void {
    this.defaults ??= {
      title: this.title.getTitle(),
      description: this.meta.getTag('name="description"')?.content ?? '',
    };

    this.title.setTitle(data.title);
    this.meta.updateTag({ name: 'description', content: data.description });

    this.meta.updateTag({ property: 'og:site_name', content: SITE_NAME });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:title', content: data.title });
    this.meta.updateTag({ property: 'og:description', content: data.description });

    if (data.noindex) {
      this.meta.updateTag({ name: 'robots', content: 'noindex, nofollow' });
    } else {
      this.meta.removeTag('name="robots"');
    }

    if (SITE_URL) {
      this.setCanonical(`${SITE_URL}${data.path}`);
      this.meta.updateTag({ property: 'og:url', content: `${SITE_URL}${data.path}` });
    }
  }

  /** Vuelve a los valores de la página de inicio al salir de una página de servicio. */
  public restore(): void {
    if (this.defaults) {
      this.title.setTitle(this.defaults.title);
      this.meta.updateTag({ name: 'description', content: this.defaults.description });
    }

    this.meta.removeTag('name="robots"');
    ['og:site_name', 'og:type', 'og:title', 'og:description', 'og:url'].forEach((property) =>
      this.meta.removeTag(`property="${property}"`),
    );
    this.document.head.querySelector('link[rel="canonical"]')?.remove();
  }

  private setCanonical(url: string): void {
    let link = this.document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');

    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }

    link.setAttribute('href', url);
  }
}
