import { Component, OnDestroy, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideArrowRight,
  lucideDatabase,
  lucideLink,
  lucideListChecks,
  lucideSearch,
  lucideSparkles,
  lucideWorkflow,
} from '@ng-icons/lucide';
import { RevealDirective } from '../../../core/reveal.directive';
import { SeoService } from '../../../core/seo.service';
import { PageContent } from '../../../shared/models/page-content.model';
import { PageClosingComponent } from '../../../shared/page-closing/page-closing.component';
import { CASES } from '../../cases/case-studies/cases.data';

/**
 * Página «Nosotros».
 *
 * Contenido: la frase de la portada, «qué hacemos», las cuatro áreas, la filosofía, la historia, el método (primeros tres pasos del FAQ) y los clientes (los casos de «Casos de éxito»).
 */
@Component({
  selector: 'app-about-us',
  imports: [NgIcon, RouterLink, RevealDirective, PageClosingComponent],
  providers: [
    provideIcons({ lucideArrowRight, lucideDatabase, lucideLink, lucideListChecks, lucideSearch, lucideSparkles, lucideWorkflow }),
  ],
  templateUrl: './about-us.component.html',
})
export class AboutUsComponent implements OnDestroy {
  private readonly seo = inject(SeoService);

  public readonly areas = [
    { icon: 'lucideWorkflow', title: 'Automatización', text: 'Procesos que avanzan automáticamente.' },
    { icon: 'lucideSparkles', title: 'Inteligencia Artificial', text: 'Sistemas que entienden y responden.' },
    { icon: 'lucideDatabase', title: 'CRM', text: 'Información centralizada y organizada.' },
    { icon: 'lucideLink', title: 'Integraciones', text: 'Todas tus herramientas trabajando juntas.' },
  ];

  // Historia: coincide con cómo empezó el negocio (sin fechas, nombres ni cifras).
  public readonly story = {
    eyebrow: 'Nuestra historia',
    title: 'Por qué existe GrowthProject AI',
    paragraphs: [
      'Vimos que muchas empresas dedican buena parte de su día a tareas repetitivas: responder los mismos mensajes, pasar datos de una herramienta a otra, hacer seguimiento a mano. Mientras tanto, las oportunidades se enfriaban y los equipos no tenían tiempo para lo importante.',
      'Por eso nos dedicamos a la automatización de procesos, la inteligencia artificial, el CRM y la integración de herramientas. No instalamos una herramienta y nos vamos: diseñamos cada sistema a la medida de cómo funciona el negocio.',
      'Hoy ayudamos a empresas a conectar sus canales, organizar su información y automatizar lo repetitivo, para que sus equipos trabajen de una manera más eficiente.',
    ],
  };

  // REAL: los tres primeros pasos de la respuesta «¿Cómo empieza un proyecto de automatización?» del FAQ.
  public readonly steps = [
    { title: 'Analizamos tu proceso actual', text: 'Revisamos cómo funciona hoy: captación, atención, seguimiento y herramientas.' },
    { title: 'Identificamos qué automatizar', text: 'Definimos qué tareas pueden automatizarse y cuáles conviene que siga haciendo una persona.' },
    { title: 'Diseñamos el sistema', text: 'Construimos el sistema que mejor se adapte a tu operación, conectado a las herramientas que ya usas.' },
  ];

  /** Icono de cada paso del método, en orden. */
  public readonly stepIcons = ['lucideSearch', 'lucideListChecks', 'lucideWorkflow'];

  /** Los clientes son los mismos de «Casos de éxito». */
  public readonly clients = CASES;

  public readonly closing: Pick<PageContent, 'faqs' | 'cta'> = {
    faqs: [],
    cta: {
      title: 'Conversemos sobre tu proceso',
      text: 'Cuéntanos cómo trabaja tu negocio y diseñamos el sistema que mejor se adapte.',
      button: 'Solicitar reunión',
    },
  };

  constructor() {
    this.seo.apply({
      title: 'Nosotros: automatización e IA | GrowthProject AI',
      description:
        'Somos una empresa dedicada a la automatización de procesos, inteligencia artificial, CRM e integración de herramientas digitales.',
      path: '/nosotros',
    });
  }

  public ngOnDestroy(): void {
    this.seo.restore();
  }
}
