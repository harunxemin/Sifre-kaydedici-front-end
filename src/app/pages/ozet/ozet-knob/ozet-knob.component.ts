import { Component, input, numberAttribute } from '@angular/core';

@Component({
  selector: 'ozet-knob',
  templateUrl: 'ozet-knob.component.html'
})

export class OzetKnobComponent {
  pay = input.required<number>();
  payda = input.required<number>();
  renk = input.required<string>();
}
