import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CikisComponent } from './cikis.component';

export const routes: Routes = [
  {
    path: '',
    component: CikisComponent,
    children: [

    ]
  }
];

export const CikisRoutingModule: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
