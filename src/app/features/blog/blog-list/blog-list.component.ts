import { Component, OnDestroy, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowRight } from '@ng-icons/lucide';
import { RevealDirective } from '../../../core/reveal.directive';
import { SeoService } from '../../../core/seo.service';
import { PageContent } from '../../../shared/models/page-content.model';
import { PageClosingComponent } from '../../../shared/page-closing/page-closing.component';
import { BlogCardComponent } from '../blog-card/blog-card.component';
import { BLOG_DRAFT, CATEGORIES, POSTS, formatPostDate, postImage } from '../blog.data';

/** Listado del blog: artículo destacado, filtro por categoría y cuadrícula del resto. */
@Component({
  selector: 'app-blog-list',
  imports: [RouterLink, NgIcon, RevealDirective, PageClosingComponent, BlogCardComponent],
  providers: [provideIcons({ lucideArrowRight })],
  templateUrl: './blog-list.component.html',
})
export class BlogListComponent implements OnDestroy {
  private readonly seo = inject(SeoService);

  public readonly categories = CATEGORIES;
  public readonly date = formatPostDate;
  public readonly cover = postImage;

  /** Categoría elegida (null = todas). */
  public readonly filter = signal<string | null>(null);

  /** Artículos más recientes primero. */
  private readonly sorted = [...POSTS].sort((a, b) => b.date.localeCompare(a.date));

  public readonly filtered = computed(() => {
    const category = this.filter();
    return category ? this.sorted.filter((post) => post.category === category) : this.sorted;
  });

  /** Solo se destaca el primero cuando se ven todos los artículos. */
  public readonly featured = computed(() => (this.filter() === null ? this.filtered()[0] : undefined));
  public readonly rest = computed(() => (this.featured() ? this.filtered().slice(1) : this.filtered()));

  public readonly closing: Pick<PageContent, 'faqs' | 'cta'> = {
    faqs: [],
    cta: {
      title: '¿Quieres aplicar esto en tu negocio?',
      text: 'Cuéntanos cómo trabajas hoy y diseñamos juntos el sistema que mejor se adapte.',
      button: 'Solicitar reunión',
    },
  };

  constructor() {
    this.seo.apply({
      title: 'Blog | GrowthProject AI',
      description:
        'Guías prácticas sobre automatización de procesos, inteligencia artificial, CRM, WhatsApp e integraciones para hacer crecer tu negocio.',
      path: '/blog',
      noindex: BLOG_DRAFT,
    });
  }

  public ngOnDestroy(): void {
    this.seo.restore();
  }
}
