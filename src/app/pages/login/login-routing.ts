import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { SifreDegistirComponent } from './sifre-degistir/sifre-degistir.component';
import { SifremiUnuttumComponent } from './sifremi-unuttum/sifremi-unuttum.component';
import { YeniKullaniciComponent } from './yeni-kullanici/yeni-kullanici.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login/:ePostaAdresi', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'logout/:neden', component: LogoutComponent },
  { path: 'sifremi-unuttum', component: SifremiUnuttumComponent },
  { path: 'sifremi-unuttum/:ePostaAdresi', component: SifremiUnuttumComponent },
  { path: 'sifre-degistir', component: SifreDegistirComponent },
  { path: 'sifre-degistir/:ePostaAdresi/:token', component: SifreDegistirComponent },
  { path: 'yeni-kullanici', component: YeniKullaniciComponent }
];

export const LoginRoutingModule: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
