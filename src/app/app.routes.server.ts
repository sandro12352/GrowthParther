import { RenderMode, ServerRoute } from '@angular/ssr';
import { POSTS } from './features/blog/blog.data';

export const serverRoutes: ServerRoute[] = [
  {
    // Un artículo prerenderizado por cada entrada de blog.data.ts
    path: 'blog/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => POSTS.map((post) => ({ slug: post.slug })),
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
