import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OzetComponent } from './ozet.component';

export const routes: Routes = [
  {
    path: '',
    component: OzetComponent,
    children: [

    ]
  }
];

export const OzetRoutingModule: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
