import { Component, computed, input } from '@angular/core';
import { RevealDirective } from '../../core/reveal.directive';
import { BlogCardComponent } from '../../features/blog/blog-card/blog-card.component';
import { BlogPost, findPost } from '../../features/blog/blog.data';

/** Bloque «Artículos relacionados» de las páginas de Soluciones e Integraciones: enlaza a artículos del blog por su slug. */
@Component({
  selector: 'app-related-posts',
  imports: [RevealDirective, BlogCardComponent],
  template: `
    @if (posts().length) {
    <section class="bg-[#f7f7fa] py-20 lg:py-28">
      <div class="mx-auto px-6 lg:max-w-[80vw] lg:px-8">
        <div appReveal revealStagger class="max-w-2xl">
          <span class="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#5b49d6]">
            <span class="h-1.5 w-1.5 rounded-full bg-[#6C5CE7]"></span>
            Blog
          </span>
          <h2 class="mt-5 text-3xl font-bold leading-[1.1] tracking-tight text-[#080911] md:text-4xl">Artículos relacionados</h2>
        </div>
        <div class="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          @for (post of posts(); track post.slug) {
          <app-blog-card [post]="post" />
          }
        </div>
      </div>
    </section>
    }
  `,
})
export class RelatedPostsComponent {
  /** Slugs de los artículos (features/blog/blog.data.ts). Los que no existan se ignoran. */
  public readonly slugs = input<string[]>([]);

  protected readonly posts = computed(() => this.slugs().map((slug) => findPost(slug)).filter((post): post is BlogPost => !!post));
}
