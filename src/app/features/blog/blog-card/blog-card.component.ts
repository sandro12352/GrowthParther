import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowRight } from '@ng-icons/lucide';
import { BlogPost, formatPostDate, postImage } from '../blog.data';

/** Tarjeta de un artículo (imagen, categoría, fecha, título y resumen). La usan el listado y «Sigue leyendo». */
@Component({
  selector: 'app-blog-card',
  imports: [RouterLink, NgIcon],
  providers: [provideIcons({ lucideArrowRight })],
  template: `
    @let p = post();
    <a [routerLink]="['/blog', p.slug]" class="group flex h-full flex-col">
      <div class="overflow-hidden rounded-2xl border border-black/10 bg-[#10111A]">
        <img [src]="cover(p, 720)" [alt]="p.imageAlt" width="720" height="405" loading="lazy" decoding="async"
          class="aspect-video w-full object-cover transition duration-500 group-hover:scale-[1.04]" />
      </div>
      <div class="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
        <span class="rounded-full bg-[#6C5CE7]/10 px-3 py-1 font-semibold text-[#5b49d6]">{{ p.category }}</span>
        <span class="text-black/55">{{ date(p.date) }} · {{ p.readTime }}</span>
      </div>
      <h3 class="mt-3 text-xl font-bold leading-snug text-[#080911] transition group-hover:text-[#5b49d6]">{{ p.title }}</h3>
      <p class="mt-2 text-sm leading-6 text-black/65">{{ p.description }}</p>
      <span class="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#5b49d6]">
        Leer artículo
        <ng-icon name="lucideArrowRight" size="16" class="transition group-hover:translate-x-1" />
      </span>
    </a>
  `,
})
export class BlogCardComponent {
  public readonly post = input.required<BlogPost>();
  public readonly date = formatPostDate;
  public readonly cover = postImage;
}
