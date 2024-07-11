import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ILoginSonuc, SifreSecenekleri } from 'limitng/api/models/login';
import { IKayitIslemiSonuc } from 'limitng/api/models/ortak';
import { DeviceInfo } from 'ngx-device-detector';
import { Observable } from 'rxjs';

import { GlobalVars } from 'app/globalVars';
import { User } from 'models/user';

@Injectable({ providedIn: 'root' })

export class AuthenticationService {
  constructor(
    private httpClient: HttpClient
  ) { }

  login(kullaniciKodu: string, sifre: string, deviceInfo: DeviceInfo, isMobile: boolean, isTablet: boolean, isDesktop: boolean): Observable<ILoginSonuc> {
    const body = JSON.stringify({ kullaniciKodu, sifre, deviceInfo, isMobile, isTablet, isDesktop });

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer 1837837'
    });

    return this.httpClient.post<ILoginSonuc>(GlobalVars.checkLoginURL, body, { headers });
  }

  sifreDegistir(kullaniciKodu: string, sifre: string, token: string): Observable<IKayitIslemiSonuc> {
    const body = JSON.stringify({ sifre });

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      kullaniciKodu: encodeURI(kullaniciKodu),
      Authorization: token
    });

    return this.httpClient.post<IKayitIslemiSonuc>(GlobalVars.sifreDegistirURL, body, { headers });
  }

  sifremiUnuttum(kullaniciKodu: string, deviceInfo: DeviceInfo, isMobile: boolean, isTablet: boolean, isDesktop: boolean): Observable<IKayitIslemiSonuc> {
    const body = JSON.stringify({ kullaniciKodu, deviceInfo, isMobile, isTablet, isDesktop });

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer 1837837'
    });

    return this.httpClient.post<IKayitIslemiSonuc>(GlobalVars.sifremiUnuttumURL, body, { headers });
  }

  sifreDegistirSecenekler(kullaniciKodu: string, token: string): Observable<SifreSecenekleri> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      kullaniciKodu: encodeURI(kullaniciKodu),
      Authorization: 'Bearer ' + token
    });

    return this.httpClient.get<SifreSecenekleri>(GlobalVars.sifreDegistirSeceneklerURL, { headers });
  }

  logout(currentUser: User): Observable<IKayitIslemiSonuc> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      kullaniciKodu: encodeURI(currentUser.kullaniciKodu),
      Authorization: 'Bearer ' + currentUser.token
    });

    console.info('logout: ' + GlobalVars.logoutURL + ': ' + currentUser.kullaniciKodu);
    return this.httpClient.post<IKayitIslemiSonuc>(GlobalVars.logoutURL, '', { headers });
  }

  checkToken(kullaniciKodu: string, token: string, deviceInfo: DeviceInfo, isMobile: boolean, isTablet: boolean, isDesktop: boolean): Observable<ILoginSonuc> {
    const body = JSON.stringify({ kullaniciKodu, token, deviceInfo, isMobile, isTablet, isDesktop });

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer 1837837'
    });

    return this.httpClient.post<ILoginSonuc>(GlobalVars.checkTokenURL, body, { headers });
  }

}
