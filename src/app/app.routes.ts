import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            {
                path: '',
                loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
            },

            // Soluciones
            {
                path: 'automatizacion',
                loadComponent: () => import('./features/solutions/automation/automation.component').then(m => m.AutomationComponent),
            },
            {
                path: 'ia-para-empresas',
                loadComponent: () => import('./features/solutions/ai-for-business/ai-for-business.component').then(m => m.AiForBusinessComponent),
            },
            {
                path: 'crm',
                loadComponent: () => import('./features/solutions/crm/crm.component').then(m => m.CrmComponent),
            },

            // Integraciones
            {
                path: 'integraciones',
                loadComponent: () => import('./features/integrations/overview/overview.component').then(m => m.IntegrationsOverviewComponent),
            },
            {
                path: 'integraciones/whatsapp',
                loadComponent: () => import('./features/integrations/whatsapp/whatsapp.component').then(m => m.WhatsappComponent),
            },
            {
                path: 'integraciones/meta',
                loadComponent: () => import('./features/integrations/meta/meta.component').then(m => m.MetaComponent),
            },
            {
                path: 'integraciones/n8n',
                loadComponent: () => import('./features/integrations/n8n/n8n.component').then(m => m.N8nComponent),
            },
            {
                path: 'integraciones/gohighlevel',
                loadComponent: () => import('./features/integrations/gohighlevel/gohighlevel.component').then(m => m.GohighlevelComponent),
            },

            // Empresa
            {
                path: 'casos-de-exito',
                loadComponent: () => import('./features/cases/case-studies/case-studies.component').then(m => m.CaseStudiesComponent),
            },
            {
                path: 'nosotros',
                loadComponent: () => import('./features/about/about-us/about-us.component').then(m => m.AboutUsComponent),
            },

            // Direcciones que aún no existen (otras opciones del menú): llevan al inicio en lugar de fallar.
            { path: '**', redirectTo: '' },
        ]
    }
];
