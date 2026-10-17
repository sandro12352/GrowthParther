import { Component, ElementRef, computed, effect, inject, signal, untracked, viewChild, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideChevronLeft,
  lucideChevronRight,
  lucideMessageCircle,
  lucidePhone,
  lucideVideo,
} from '@ng-icons/lucide';
import { BrnCalendar, type BrnCalendarI18n, provideBrnCalendarI18n } from '@spartan-ng/brain/calendar';
import { HlmCalendarImports } from '@spartan-ng/helm/calendar';
import { HlmDialogImports } from '@spartan-ng/helm/dialog';
import { HlmFieldImports } from '@spartan-ng/helm/field';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { MeetingDialogService } from '../services/meeting-dialog.service';

/**
 * Disponibilidad de las reuniones (reservas desde mañana y hasta dentro de 60 días):
 *  - Lunes a viernes: 9:00 a 13:00 y 14:00 a 16:30.
 *  - Sábados: 9:00 a 12:30.
 *  - Domingos: cerrado.
 * Los huecos son de 30 minutos y la hora de cierre de cada tramo se ofrece como última hora de inicio.
 */
const MAX_DAYS_AHEAD = 60;
const SLOT_MINUTES = 30;

interface Shift {
  label: string;
  start: string;
  end: string;
}

const WEEKDAY_SHIFTS: Shift[] = [
  { label: 'Mañana', start: '09:00', end: '13:00' },
  { label: 'Tarde', start: '14:00', end: '16:30' },
];
const SATURDAY_SHIFTS: Shift[] = [{ label: 'Mañana', start: '09:00', end: '12:30' }];

export interface SlotGroup {
  label: string;
  slots: string[];
}

const toMinutes = (time: string): number => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

const toTime = (minutes: number): string =>
  `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`;

/** Horas de inicio posibles de cada tramo, en huecos de SLOT_MINUTES. */
const buildGroups = (shifts: Shift[]): SlotGroup[] =>
  shifts.map(({ label, start, end }) => {
    const slots: string[] = [];
    for (let minute = toMinutes(start); minute <= toMinutes(end); minute += SLOT_MINUTES) {
      slots.push(toTime(minute));
    }
    return { label, slots };
  });

/** Teléfono con 7 a 15 dígitos (admite +, espacios, guiones y paréntesis). */
const PHONE_PATTERN = /^\+?(?:[\s().-]*\d){7,15}[\s().-]*$/;

const WEEKDAYS_SHORT = ['D', 'L', 'M', 'X', 'J', 'V', 'S'];
const WEEKDAYS_LONG = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];

/** Textos del calendario en español, semana empezando en lunes. */
const CALENDAR_ES: Partial<BrnCalendarI18n> = {
  formatWeekdayName: (index: number) => WEEKDAYS_SHORT[index],
  labelWeekday: (index: number) => WEEKDAYS_LONG[index],
  months: () => ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
  formatHeader: (month: number, year: number) =>
    new Date(year, month).toLocaleDateString('es', { month: 'long', year: 'numeric' }),
  formatMonth: (month: number) => new Date(2000, month).toLocaleDateString('es', { month: 'short' }),
  labelPrevious: () => 'Ir al mes anterior',
  labelNext: () => 'Ir al mes siguiente',
  firstDayOfWeek: () => 1,
};

@Component({
  imports: [NgIcon, HlmDialogImports, HlmFieldImports, HlmSelectImports, HlmCalendarImports, ReactiveFormsModule],
  providers: [
    provideIcons({ lucideVideo, lucidePhone, lucideMessageCircle, lucideChevronLeft, lucideChevronRight }),
    provideBrnCalendarI18n(CALENDAR_ES),
  ],
  selector: 'app-form-meeting',
  styleUrl: './form-meeting.component.css',
  templateUrl: './form-meeting.component.html',
})
export class FormMeetingComponent {
  public readonly meetingSubmitted = signal(false);

  /** true mientras se envía la solicitud al servidor. */
  public readonly sending = signal(false);
  /** Mensaje de error si el envío falló (vacío si no hay error). */
  public readonly submitError = signal('');
  /** Momento en que se abrió el formulario: el servidor descarta envíos imposiblemente rápidos (robots). */
  private startedAt = Date.now();

  /** Paso actual del formulario: 1 = Información, 2 = Reunión. */
  public readonly step = signal<1 | 2>(1);

  /** Límites del calendario (se calculan al entrar al paso 2, siempre a partir de la fecha actual). */
  public readonly minDate = signal<Date>(new Date());
  public readonly maxDate = signal<Date>(new Date());
  public readonly calendarDate = signal<Date | undefined>(undefined);
  public readonly timezone = signal('');

  /** true cuando eligió "Otro proceso": aparece un campo para que lo describa. */
  public readonly isOther = signal(false);

  /** Horas disponibles del día elegido, agrupadas por tramo (mañana / tarde). */
  public readonly availableGroups = computed<SlotGroup[]>(() => {
    const date = this.calendarDate();
    if (!date || date.getDay() === 0) return [];

    return buildGroups(date.getDay() === 6 ? SATURDAY_SHIFTS : WEEKDAY_SHIFTS);
  });

  public readonly mediums = [
    { value: 'video', label: 'Videollamada', icon: 'lucideVideo' },
    { value: 'phone', label: 'Llamada', icon: 'lucidePhone' },
    { value: 'whatsapp', label: 'WhatsApp', icon: 'lucideMessageCircle' },
  ];

  /** Áreas que el visitante puede elegir en "¿Qué te gustaría automatizar?". */
  public readonly objectiveOptions = [
    { value: 'social-media', label: 'Redes sociales y WhatsApp' },
    { value: 'crm', label: 'CRM y seguimiento de leads' },
    { value: 'ai', label: 'Atención con inteligencia artificial' },
    { value: 'integrations', label: 'Integración de herramientas' },
    { value: 'other', label: 'Otro proceso' },
  ];

  /** El selector muestra la etiqueta de la opción elegida, no su valor interno. */
  public readonly objectiveLabel = (value: string | null): string =>
    this.objectiveOptions.find((option) => option.value === value)?.label ?? '';

  /** Los domingos no se atiende. */
  public readonly isDateDisabled = (date: Date): boolean => date.getDay() === 0;

  private readonly meetingDialogService = inject(MeetingDialogService);

  @ViewChild('meetingTrigger', { static: true })
  private meetingTrigger?: ElementRef<HTMLButtonElement>;

  public readonly meetingForm = new FormGroup({
    // Paso 1: Información
    name: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(2)] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    company: new FormControl('', { nonNullable: true }),
    phone: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.pattern(PHONE_PATTERN)] }),
    // Paso 2: Reunión
    objective: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    otherDetail: new FormControl('', { nonNullable: true }),
    /** Campo trampa (honeypot): oculto para las personas; los robots lo rellenan. */
    website: new FormControl('', { nonNullable: true }),
    medium: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    date: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    time: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  private readonly stepOneControls = ['name', 'email', 'company', 'phone'] as const;
  private readonly stepTwoControls = ['objective', 'otherDetail', 'medium', 'date', 'time'] as const;

  constructor() {
    effect(() => {
      const request = this.meetingDialogService.openRequests();

      if (request === 0) {
        return;
      }

      // Solo `openRequests` debe disparar este efecto: el resto se lee sin seguimiento (si no,
      // al enviar el formulario con éxito el efecto se reejecutaría y reiniciaría el formulario en bucle).
      untracked(() => {
        // Si la solicitud anterior ya se envió, el formulario se abre limpio.
        if (this.meetingSubmitted()) {
          this.resetForm();
        }
        this.startedAt = Date.now();

        this.meetingTrigger?.nativeElement.click();
      });
    });

    // "Otro proceso": el cliente debe describirlo; con cualquier otra opción el campo desaparece.
    this.meetingForm.controls.objective.valueChanges.subscribe((value) => {
      const other = value === 'other';
      const detail = this.meetingForm.controls.otherDetail;

      this.isOther.set(other);
      detail.setValidators(other ? [Validators.required, Validators.minLength(5)] : []);
      if (!other) detail.setValue('');
      detail.updateValueAndValidity();
    });
  }

  public nextStep(): void {
    const invalid = this.stepOneControls.some((name) => this.meetingForm.controls[name].invalid);

    if (invalid) {
      this.touch(this.stepOneControls);
      return;
    }

    const today = new Date();
    const min = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    const max = new Date(today.getFullYear(), today.getMonth(), today.getDate() + MAX_DAYS_AHEAD);

    this.minDate.set(min);
    this.maxDate.set(max);
    this.timezone.set(Intl.DateTimeFormat().resolvedOptions().timeZone);
    this.step.set(2);
  }

  public previousStep(): void {
    this.step.set(1);
  }

  public choose(control: 'medium' | 'time', value: string): void {
    this.meetingForm.controls[control].setValue(value);
    this.meetingForm.controls[control].markAsTouched();
  }

  /** Se llama al elegir un día en el calendario. */
  public onDateChange(date: Date | undefined): void {
    this.calendarDate.set(date);
    this.meetingForm.controls.date.setValue(date ? this.toIso(date) : '');
    this.meetingForm.controls.date.markAsTouched();

    // Si la hora elegida antes no existe ese día (por ejemplo, 14:00 un sábado), se descarta.
    const time = this.meetingForm.controls.time;
    const stillAvailable = this.availableGroups().some((group) => group.slots.includes(time.value));
    if (time.value && !stillAvailable) time.setValue('');
  }

  public isInvalid(control: 'medium' | 'date' | 'time' | 'otherDetail'): boolean {
    const field = this.meetingForm.controls[control];
    return field.invalid && field.touched;
  }

  private readonly calendar = viewChild('calendar', { read: BrnCalendar });

  /**
   * Navegación de meses propia. Los botones de Spartan deshabilitan "mes anterior" cuando el MISMO número
   * de día del mes anterior queda antes de la fecha mínima (p. ej. desde el 3 de noviembre, el 3 de octubre
   * ya pasó) y no permitían volver a un mes que sí tiene días disponibles.
   */
  public calendarMonthLabel(): string {
    const focused = this.calendar()?.focusedDate() as Date | undefined;
    if (!focused) return '';

    return new Intl.DateTimeFormat('es', { month: 'long', year: 'numeric' }).format(focused);
  }

  public canGoToMonth(delta: -1 | 1): boolean {
    const focused = this.calendar()?.focusedDate() as Date | undefined;
    if (!focused) return false;

    const monthIndex = (date: Date) => date.getFullYear() * 12 + date.getMonth();
    const limit = delta < 0 ? this.minDate() : this.maxDate();

    return delta < 0 ? monthIndex(focused) > monthIndex(limit) : monthIndex(focused) < monthIndex(limit);
  }

  public shiftMonth(delta: -1 | 1): void {
    const calendar = this.calendar();
    const focused = calendar?.focusedDate() as Date | undefined;
    if (!calendar || !focused || !this.canGoToMonth(delta)) return;

    // `setFocusedDate` ignora los días deshabilitados (p. ej. un domingo o uno anterior al mínimo),
    // así que se enfoca el primer día reservable del mes de destino.
    const year = focused.getFullYear();
    const month = focused.getMonth() + delta;
    const min = this.minDate().getTime();
    const max = this.maxDate().getTime();

    for (let day = 1; day <= 31; day++) {
      const candidate = new Date(year, month, day);
      if (candidate.getMonth() !== ((month % 12) + 12) % 12) break;

      if (candidate.getTime() >= min && candidate.getTime() <= max && !this.isDateDisabled(candidate)) {
        calendar.setFocusedDate(candidate);
        return;
      }
    }
  }

  /** "martes 21 de octubre" para el día elegido. */
  public selectedDayLabel(): string {
    const date = this.calendarDate();
    if (!date) return '';

    return new Intl.DateTimeFormat('es', { weekday: 'long', day: 'numeric', month: 'long' })
      .format(date)
      .replace(',', '');
  }

  /** Resumen legible de la reunión elegida ("martes 21 de octubre · 10:00 · Videollamada"). */
  public summary(): string {
    const { time, medium } = this.meetingForm.getRawValue();
    const mediumLabel = this.mediums.find((option) => option.value === medium)?.label;

    return [this.selectedDayLabel(), time, mediumLabel].filter(Boolean).join(' · ');
  }

  public async submitMeeting(): Promise<void> {
    if (this.sending()) return;

    if (this.step() === 1) {
      this.nextStep();
      return;
    }

    const invalid = this.stepTwoControls.some((name) => this.meetingForm.controls[name].invalid);

    if (invalid) {
      this.touch(this.stepTwoControls);
      return;
    }

    this.sending.set(true);
    this.submitError.set('');

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...this.meetingForm.getRawValue(), startedAt: this.startedAt }),
      });
      const result = (await response.json().catch(() => null)) as { ok?: boolean } | null;

      if (!response.ok || !result?.ok) {
        throw new Error(`Respuesta no válida (${response.status})`);
      }

      this.meetingSubmitted.set(true);
    } catch {
      this.submitError.set('No pudimos enviar tu solicitud. Revisa tu conexión e inténtalo de nuevo en unos minutos.');
    } finally {
      this.sending.set(false);
    }
  }

  /** Deja el formulario como nuevo (paso 1, sin datos ni mensajes). */
  private resetForm(): void {
    this.meetingForm.reset();
    this.step.set(1);
    this.meetingSubmitted.set(false);
    this.calendarDate.set(undefined);
    this.isOther.set(false);
    this.submitError.set('');
    this.sending.set(false);
  }

  /**
   * Marca los campos como tocados y vuelve a emitir su estado. Sin el `updateValueAndValidity`,
   * los <hlm-field-error> de Spartan no se enteran del cambio y los mensajes no aparecen.
   */
  private touch(names: readonly (keyof typeof this.meetingForm.controls)[]): void {
    names.forEach((name) => {
      const control = this.meetingForm.controls[name];
      control.markAsTouched();
      control.updateValueAndValidity();
    });
  }

  private toIso(date: Date): string {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${date.getFullYear()}-${month}-${day}`;
  }

}
