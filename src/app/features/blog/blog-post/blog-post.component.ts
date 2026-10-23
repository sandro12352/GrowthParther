import { Component, OnDestroy, computed, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowLeft } from '@ng-icons/lucide';
import { RevealDirective } from '../../../core/reveal.directive';
import { SeoService } from '../../../core/seo.service';
import { map } from 'rxjs';
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

  /** El artículo sale de la dirección y se actualiza al pasar de uno a otro (Angular reutiliza el componente). */
  private readonly slug = toSignal(inject(ActivatedRoute).paramMap.pipe(map((params) => params.get('slug'))), { initialValue: null });
  public readonly post = computed<BlogPost | undefined>(() => findPost(this.slug()));
  public readonly date = formatPostDate;
  public readonly cover = postImage;

  /** Otros artículos: primero los de la misma categoría y, si faltan, los más recientes. */
  public readonly related = computed(() => {
    const current = this.post();
    if (!current) return [];
    const others = POSTS.filter((item) => item.slug !== current.slug);
    const same = others.filter((item) => item.category === current.category);
    const rest = others.filter((item) => item.category !== current.category).sort((a, b) => b.date.localeCompare(a.date));
    return [...same, ...rest].slice(0, 3);
  });

  /** Página de servicio relacionada con la categoría del artículo (enlace interno). */
  public readonly service = computed(() => {
    const links: Record<string, { label: string; path: string }> = {
      'Automatización': { label: 'Automatización de procesos', path: '/automatizacion' },
      'Inteligencia Artificial': { label: 'IA para empresas', path: '/ia-para-empresas' },
      CRM: { label: 'CRM y automatización de leads', path: '/crm' },
      Ventas: { label: 'CRM y automatización de leads', path: '/crm' },
      WhatsApp: { label: 'Automatización de WhatsApp con IA', path: '/integraciones/whatsapp' },
      Integraciones: { label: 'Integraciones', path: '/integraciones' },
    };
    const current = this.post();
    return current ? links[current.category] : undefined;
  });

  public readonly closing: Pick<PageContent, 'faqs' | 'cta'> = {
    faqs: [],
    cta: {
      title: '¿Quieres aplicar esto en tu negocio?',
      text: 'Cuéntanos cómo trabajas hoy y diseñamos juntos el sistema que mejor se adapte.',
      button: 'Solicitar reunión',
    },
  };

  constructor() {
    effect(() => {
      const post = this.post();
      if (!post) {
        // Dirección que no corresponde a ningún artículo: vuelve al listado.
        void this.router.navigateByUrl('/blog', { replaceUrl: true });
        return;
      }
      this.seo.apply({
        title: `${post.title} | GrowthProject AI`.length <= 65 ? `${post.title} | GrowthProject AI` : post.title,
        description: post.description,
        path: `/blog/${post.slug}`,
        noindex: BLOG_DRAFT,
      });
    });
  }

  public ngOnDestroy(): void {
    this.seo.restore();
  }
}
