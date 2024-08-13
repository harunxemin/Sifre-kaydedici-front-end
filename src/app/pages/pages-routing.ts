import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'guards/auth.guard';
import { PagesComponent } from './pages.component';

// export function loadChildren(path) { return System.import(path); };

export const routes: Routes = [
  { path: 'login', loadChildren: () => import('./login/login.module') },
  { path: 'logout', loadChildren: () => import('./login/login.module') },
  { path: 'sifremi-unuttum', loadChildren: () => import('./login/login.module') },
  { path: 'yeni-kullanici', loadChildren: () => import('./login/login.module') },
  { path: 'sifre-degistir', loadChildren: () => import('./login/login.module') },
  {
    path: 'pages',
    component: PagesComponent,
    children: [
      { path: '', redirectTo: 'ozet', pathMatch: 'full' },
      { path: 'ozet', loadChildren: () => import('./ozet/ozet.module'), canActivate: [AuthGuard] },
      { path: 'cikis', loadChildren: () => import('./cikis/cikis.module'), canActivate: [AuthGuard] }
    ]
  }
];

export const PagesRoutingModule: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
