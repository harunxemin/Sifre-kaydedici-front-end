import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  //  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: '', redirectTo: 'pages/ozet', pathMatch: 'full' },
  { path: 'ajans-islemleri/:ajansKodu', redirectTo: 'pages/ajans-islemleri/:ajansKodu', pathMatch: 'full' },
  { path: 'ajans-islemleri', redirectTo: 'pages/ajans-islemleri', pathMatch: 'full' },
  { path: 'mecra-islemleri/:mecraKodu', redirectTo: 'pages/mecra-islemleri/:mecraKodu', pathMatch: 'full' },
  { path: 'mecra-islemleri', redirectTo: 'pages/mecra-islemleri', pathMatch: 'full' },
  { path: 'kullanici-islemleri', redirectTo: 'pages/kullanici-islemleri', pathMatch: 'full' },
  { path: 'prototip-islemleri/:mecraKodu/:yil/:ay', redirectTo: 'pages/prototip-islemleri/:mecraKodu/:yil/:ay', pathMatch: 'full' },
  { path: 'prototip-islemleri/:mecraKodu/:yil', redirectTo: 'pages/prototip-islemleri/:mecraKodu/:yil', pathMatch: 'full' },
  { path: 'prototip-islemleri/:mecraKodu', redirectTo: 'pages/prototip-islemleri/:mecraKodu', pathMatch: 'full' },
  { path: 'prototip-islemleri', redirectTo: 'pages/prototip-islemleri', pathMatch: 'full' },
  { path: 'teklifler/:teklifUniqueKodu', redirectTo: 'pages/teklifler/:teklifUniqueKodu', pathMatch: 'full' },
  { path: 'teklifler', redirectTo: 'pages/teklifler', pathMatch: 'full' },
  { path: 'logbook', redirectTo: 'pages/logbook', pathMatch: 'full' },
  { path: 'sistem-ozet/:aktifSekme', redirectTo: 'pages/sistem-ozet/:aktifSekme', pathMatch: 'full' },
  { path: 'sistem-ozet', redirectTo: 'pages/sistem-ozet', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages/ozet' }
];

export const AppRoutingModule: ModuleWithProviders<RouterModule> = RouterModule.forRoot(routes, {
  useHash: false,
  onSameUrlNavigation: 'reload'
  // , enableTracing: true
});
