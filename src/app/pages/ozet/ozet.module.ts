import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { NgaModule } from 'app/theme/nga.module';
import { AylikChartComponent } from './aylik-chart/aylikChart.component';
import { OzetKartComponent } from './ozet-kart/ozet-kart.component';
import { OzetKnobComponent } from './ozet-knob/ozet-knob.component';
import { OzetRoutingModule } from './ozet-routing';
import { OzetComponent } from './ozet.component';

@NgModule({
  imports: [
    FormsModule,
    NgaModule,
    TranslateModule,
    OzetRoutingModule
  ],
  declarations: [
    AylikChartComponent,
    OzetComponent,
    OzetKartComponent,
    OzetKnobComponent
  ]
})

export default class OzetModule { }
