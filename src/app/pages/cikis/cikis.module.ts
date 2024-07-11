import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NgaModule } from 'app/theme/nga.module';
import { PagesModule } from '../pages.module';
import { CikisRoutingModule } from './cikis-routing';
import { CikisComponent } from './cikis.component';

@NgModule({
  declarations: [CikisComponent],
  imports: [
    FormsModule,
    NgaModule,
    PagesModule,
    CikisRoutingModule
  ]
})

export default class CikisModule { }
