import { Component, input } from '@angular/core';

import { IOzetKartAlan } from 'limitng/api/models/ozet/ozetkartalan';

@Component({
  selector: 'ozet-kart',
  templateUrl: 'ozet-kart.component.html'
})

export class OzetKartComponent {
  ozetKart = input<IOzetKartAlan>();

}
