import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MeetingDialogService {
  private readonly openRequest = signal(0);

  public readonly openRequests = this.openRequest.asReadonly();

  public requestOpen(): void {
    this.openRequest.update((request) => request + 1);
  }
}
