import { Component, ElementRef, effect, inject, signal, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { HlmDialogImports } from '@spartan-ng/helm/dialog';
import { HlmFieldImports } from '@spartan-ng/helm/field';
import { MeetingDialogService } from '../services/meeting-dialog.service';

@Component({
  imports: [HlmDialogImports ,HlmFieldImports, ReactiveFormsModule],
  selector: 'app-form-meeting',
  styleUrl: './form-meeting.component.css',
  templateUrl: './form-meeting.component.html',
})
export class FormMeetingComponent {
  public readonly meetingSubmitted = signal(false);
  private readonly meetingDialogService = inject(MeetingDialogService);

  @ViewChild('meetingTrigger', { static: true })
  private meetingTrigger?: ElementRef<HTMLButtonElement>;

  public readonly meetingForm = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(2)] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    company: new FormControl('', { nonNullable: true }),
    phone: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    objective: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });
  
  constructor() {
    effect(() => {
      const request = this.meetingDialogService.openRequests();

      if (request === 0) {
        return;
      }

      this.meetingTrigger?.nativeElement.click();
    });
  }

  public submitMeeting(): void {
    if (this.meetingForm.invalid) {
      this.meetingForm.markAllAsTouched();
      return;
    }

    this.meetingSubmitted.set(true);
  }
}
