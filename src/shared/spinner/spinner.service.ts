import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class SpinnerService {
  status = new Subject<boolean>();
  private _spinnerActive = false;

  get spinnerActive(): boolean {
    return this._spinnerActive;
  }

  set spinnerActive(value: boolean) {
    this._spinnerActive = value;
    this.status.next(value);
  }

  start(): void {
    this.spinnerActive = true;
  }

  stop(): void {
    this.spinnerActive = false;
  }
}
