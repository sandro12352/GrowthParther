import { Component, OnDestroy, computed, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowLeft } from '@ng-icons/lucide';
import { RevealDirective } from '../../../core/reveal.directive';
import { SeoService } from '../../../core/seo.service';
import { PageContent } from '../../../shared/models/page-content.model';
import { PageClosingComponent } from '../../../shared/page-closing/page-closing.component';
import { BlogCardComponent } from '../blog-card/blog-card.component';
import { BLOG_DRAFT, BlogPost, POSTS, findPost, formatPostDate, postImage } from '../blog.data';

/** Página de un artículo: cabecera, portada, cuerpo por bloques, «Sigue leyendo» y llamada a la acción. */
@Component({
  selector: 'app-blog-post',
  imports: [RouterLink, NgIcon, RevealDirective, PageClosingComponent, BlogCardComponent],
  providers: [provideIcons({ lucideArrowLeft })],
  templateUrl: './blog-post.component.html',
})
export class BlogPostComponent implements OnDestroy {
  private readonly router = inject(Router);
  private readonly seo = inject(SeoService);

  public readonly post: BlogPost | undefined = findPost(inject(ActivatedRoute).snapshot.paramMap.get('slug'));
  public readonly date = formatPostDate;
  public readonly cover = postImage;

  /** Otros artículos: primero los de la misma categoría y, si faltan, los más recientes. */
  public readonly related = computed(() => {
    const current = this.post;
    if (!current) return [];
    const others = POSTS.filter((item) => item.slug !== current.slug);
    const same = others.filter((item) => item.category === current.category);
    const rest = others.filter((item) => item.category !== current.category).sort((a, b) => b.date.localeCompare(a.date));
    return [...same, ...rest].slice(0, 3);
  });

  /** Página de servicio relacionada con la categoría del artículo (enlace interno). */
  public readonly service = (() => {
    const links: Record<string, { label: string; path: string }> = {
      'Automatización': { label: 'Automatización de procesos', path: '/automatizacion' },
      'Inteligencia Artificial': { label: 'IA para empresas', path: '/ia-para-empresas' },
      CRM: { label: 'CRM y automatización de leads', path: '/crm' },
      Ventas: { label: 'CRM y automatización de leads', path: '/crm' },
      WhatsApp: { label: 'Automatización de WhatsApp con IA', path: '/integraciones/whatsapp' },
      Integraciones: { label: 'Integraciones', path: '/integraciones' },
    };
    return this.post ? links[this.post.category] : undefined;
  })();

  public readonly closing: Pick<PageContent, 'faqs' | 'cta'> = {
    faqs: [],
    cta: {
      title: '¿Quieres aplicar esto en tu negocio?',
      text: 'Cuéntanos cómo trabajas hoy y diseñamos juntos el sistema que mejor se adapte.',
      button: 'Solicitar reunión',
    },
  };

  constructor() {
    if (!this.post) {
      // Dirección que no corresponde a ningún artículo: vuelve al listado.
      void this.router.navigateByUrl('/blog', { replaceUrl: true });
      return;
    }
    this.seo.apply({
      title: `${this.post.title} | GrowthProject AI`.length <= 65 ? `${this.post.title} | GrowthProject AI` : this.post.title,
      description: this.post.description,
      path: `/blog/${this.post.slug}`,
      noindex: BLOG_DRAFT,
    });
  }

  public ngOnDestroy(): void {
    this.seo.restore();
  }
}
