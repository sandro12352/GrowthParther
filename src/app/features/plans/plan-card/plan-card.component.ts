import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowRight, lucideCheck } from '@ng-icons/lucide';
import { whatsappUrl } from '../../../core/contact.config';
import { Plan } from '../plans.data';

/** Escalera de valor: del plan más simple (claro, neutro) al más completo (oscuro, gradiente). */
export const PLAN_THEMES = {
  basico: {
    frame: 'bg-black/10 shadow-[0_20px_50px_rgba(8,9,17,0.08)]',
    card: 'bg-[#f4f4f7]',
    glow: 'bg-[#6C8CFF]/10',
    eyebrow: 'text-[#5b49d6]',
    badge: 'border border-black/10 bg-black/[0.04] text-black/65',
    title: 'text-[#080911]',
    text: 'text-black/65',
    priceBox: 'border-black/10 bg-white',
    divider: 'bg-black/10',
    hoverShadow: 'group-hover:shadow-[0_30px_70px_rgba(8,9,17,0.2)]',
    setup: 'text-[#080911]',
    monthly: 'text-[#5b49d6]',
    check: 'text-[#5b49d6]',
    ideal: 'border-[#6C5CE7] bg-[#6C5CE7]/10 text-[#080911]/80',
    button: 'btn-fx [--fx:#080911] border border-[#080911]/15 bg-white text-[#080911] hover:text-white',
  },
  comercial: {
    frame: 'bg-gradient-to-br from-[#A99CFF] via-[#6C5CE7] to-[#6C8CFF] shadow-[0_30px_80px_rgba(108,92,231,0.4)]',
    card: 'bg-gradient-to-b from-[#5b49d6] to-[#3a2a9e]',
    glow: 'bg-white/25',
    eyebrow: 'text-white/80',
    badge: 'bg-white text-[#3a2a9e]',
    title: 'text-white',
    text: 'text-white/80',
    priceBox: 'border-white/20 bg-white/10',
    divider: 'bg-white/20',
    hoverShadow: 'group-hover:shadow-[0_35px_90px_rgba(108,92,231,0.6)]',
    setup: 'text-white',
    monthly: 'text-white',
    check: 'text-[#00F2FE]',
    ideal: 'border-white bg-white/10 text-white/90',
    button: 'btn-fx [--fx:#080911] bg-white text-[#3a2a9e] hover:text-white hover:shadow-[0_10px_30px_rgba(8,9,17,0.35)]',
  },
  avanzado: {
    frame: 'bg-gradient-to-br from-[#6C5CE7] via-[#6C8CFF] to-[#00F2FE] shadow-[0_30px_90px_rgba(0,242,254,0.25)]',
    card: 'bg-[#080911]',
    glow: 'bg-[#00F2FE]/25',
    eyebrow: 'text-[#00F2FE]',
    badge: 'bg-gradient-to-r from-[#6C5CE7] to-[#00F2FE] text-[#080911]',
    title: 'text-white',
    text: 'text-white/75',
    priceBox: 'border-white/10 bg-white/[0.04]',
    divider: 'bg-white/10',
    hoverShadow: 'group-hover:shadow-[0_35px_100px_rgba(0,242,254,0.4)]',
    setup: 'text-white',
    monthly: 'bg-gradient-to-r from-[#A99CFF] to-[#00F2FE] bg-clip-text text-transparent',
    check: 'text-[#00F2FE]',
    ideal: 'border-[#00F2FE] bg-[#00F2FE]/10 text-white/85',
    button: 'btn-fx [--fx:#6C5CE7] bg-gradient-to-r from-[#6C5CE7] via-[#6C8CFF] to-[#00F2FE] text-[#080911] hover:text-white hover:shadow-[0_10px_30px_rgba(0,242,254,0.4)]',
  },
};

/** Inclinación de las tarjetas del inicio (solo con `tilted`): en la página de comparación van alineadas. */
const TILTS: Record<Plan['slug'], string> = {
  basico: 'lg:-rotate-2',
  comercial: 'lg:-translate-y-4',
  avanzado: 'lg:rotate-2',
};

/**
 * Tarjeta de un plan (precios, qué incluye y botones). La usan el inicio y la página de comparación /planes,
 * así un plan se ve igual en los dos sitios. Los datos salen de plans.data.ts.
 */
@Component({
  selector: 'app-plan-card',
  imports: [NgIcon, RouterLink],
  providers: [provideIcons({ lucideArrowRight, lucideCheck })],
  host: { class: 'flex' },
  templateUrl: './plan-card.component.html',
})
export class PlanCardComponent {
  public readonly plan = input.required<Plan>();
  /** true en el inicio (tarjetas ligeramente inclinadas y desniveladas); false en /planes (alineadas, para comparar). */
  public readonly tilted = input(false);
  /** true en /planes: en vez del resumen, lista todo lo que incluye la implementación y el servicio mensual. */
  public readonly full = input(false);

  /** Todo lo incluido en la implementación (lo del plan anterior, lo propio y, en el Avanzado, las capacidades adicionales). */
  protected readonly fullIncluded = computed(() => {
    const p = this.plan();
    return [...(p.included.base ? [p.included.base.title] : []), ...p.included.items.map((i) => i.title), ...(p.extras?.items.map((i) => i.title) ?? [])];
  });
  protected readonly fullMonthly = computed(() => this.plan().monthlyService.items.map((i) => i.title));

  /** «Elegir plan» abre WhatsApp con el plan ya indicado en el mensaje. */
  protected readonly whatsapp = computed(() => whatsappUrl(`Hola, quiero contratar el ${this.plan().name}.`));

  protected readonly theme = computed(() => PLAN_THEMES[this.plan().slug]);
  /**
   * Inicio (tilted): la tarjeta está inclinada y, al pasar el cursor, se endereza y sube.
   * /planes: sin movimiento (es una página para comparar y, con la tarjeta tan alta, el movimiento junto al borde inferior
   * hace temblar el botón); en su lugar se intensifica la sombra.
   */
  protected readonly articleClass = computed(() =>
    this.tilted() ? `${TILTS[this.plan().slug]} lg:hover:z-20 lg:hover:-translate-y-3 lg:hover:rotate-0` : '',
  );
  protected readonly frameClass = computed(() => {
    const t = this.theme();
    return this.tilted() ? t.frame : `${t.frame} transition-shadow duration-500 ${t.hoverShadow}`;
  });

}
