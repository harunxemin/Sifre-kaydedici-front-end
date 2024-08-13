import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  //  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: '', redirectTo: 'pages/ozet', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages/ozet' }
];

export const AppRoutingModule: ModuleWithProviders<RouterModule> = RouterModule.forRoot(routes, {
  useHash: false,
  onSameUrlNavigation: 'reload'
  // , enableTracing: true
});
