import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface GsapKit {
  gsap: typeof import('gsap').gsap;
  ScrollTrigger: typeof import('gsap/ScrollTrigger').ScrollTrigger;
}

/**
 * Punto único de acceso a GSAP.
 * Se carga bajo demanda y solo en el navegador (la app usa SSR y GSAP necesita `window`).
 */
@Injectable({ providedIn: 'root' })
export class GsapService {
  private readonly platformId = inject(PLATFORM_ID);
  private kit?: Promise<GsapKit>;

  /** Devuelve `null` en el servidor. */
  public load(): Promise<GsapKit | null> {
    if (!isPlatformBrowser(this.platformId)) {
      return Promise.resolve(null);
    }

    this.kit ??= Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        gsap.registerPlugin(ScrollTrigger);
        return { gsap, ScrollTrigger };
      },
    );

    return this.kit;
  }
}
