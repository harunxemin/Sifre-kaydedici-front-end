import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { NgaModule } from 'app/theme/nga.module';

@NgModule({
  exports: [
    FormsModule,
    TranslateModule
  ],
  imports: [
    NgaModule
  ]

})

export class SharedModule { }
