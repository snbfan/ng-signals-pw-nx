import { Injectable, signal, Signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SubmittedStateService {
  private wasSubmitted = signal<boolean>(false);

  public set submitted(submitted: boolean) {
    this.wasSubmitted.set(submitted);
  }

  public get submitted(): Signal<boolean> {
    return this.wasSubmitted.asReadonly();
  }
}
