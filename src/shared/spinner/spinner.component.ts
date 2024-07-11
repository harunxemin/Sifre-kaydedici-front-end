import { Component } from '@angular/core';

import { SpinnerService } from './spinner.service';

@Component({
  selector: 'spinner',
  templateUrl: 'spinner.component.html',
  styleUrl: 'spinner.component.scss'
})

export class SpinnerComponent {
  spinnerActive = false;

  constructor(spinnerService: SpinnerService) {
    spinnerService.status
      .subscribe({
        next: (status) => {
          this.spinnerActive = status;
        }
      });
  }
}
