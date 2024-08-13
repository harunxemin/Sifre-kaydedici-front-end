import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgaModule } from 'app/theme/nga.module';
import { LoginRoutingModule } from './login-routing';
import { LoginUstComponent } from './login-ust/login-ust.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { SifreDegistirComponent } from './sifre-degistir/sifre-degistir.component';
import { SifremiUnuttumComponent } from './sifremi-unuttum/sifremi-unuttum.component';
import { YeniKullaniciComponent } from './yeni-kullanici/yeni-kullanici.component';

@NgModule({
  imports: [
    FormsModule,
    LoginRoutingModule,
    NgaModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'sifre-degistir', component: SifreDegistirComponent },
      { path: 'sifremi-unuttum', component: SifremiUnuttumComponent },
      { path: 'yeni-kullanici', component: YeniKullaniciComponent },
      { path: 'login', component: LoginComponent },
      { path: 'logout', component: LogoutComponent }

    ]),
  ],
  declarations: [
    LoginComponent,
    LoginUstComponent,
    LogoutComponent,
    SifreDegistirComponent,
    SifremiUnuttumComponent,
    YeniKullaniciComponent
  ]
})

export default class LoginModule { }
