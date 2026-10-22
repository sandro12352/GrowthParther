import { RenderMode, ServerRoute } from '@angular/ssr';
import { POSTS } from './features/blog/blog.data';
import { PLANS } from './features/plans/plans.data';

export const serverRoutes: ServerRoute[] = [
  {
    // Un artículo prerenderizado por cada entrada de blog.data.ts
    path: 'blog/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => POSTS.map((post) => ({ slug: post.slug })),
  },
  {
    // Una página por cada plan de plans.data.ts
    path: 'planes/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => PLANS.map((plan) => ({ slug: plan.slug })),
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
