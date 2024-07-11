import { NgModule } from '@angular/core';

import { NgaModule } from 'app/theme/nga.module';
import { PagesRoutingModule } from './pages-routing';
import { PagesComponent } from './pages.component';

@NgModule({
  imports: [
    NgaModule,
    PagesRoutingModule
  ],
  declarations: [
    PagesComponent
  ],
  exports: [
  ]
})

export class PagesModule {
}
