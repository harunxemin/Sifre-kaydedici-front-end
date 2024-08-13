import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { SifreSecenekleri } from 'limitng/api/models/login';
import { IKayitIslemiSonuc } from 'limitng/api/models/ortak';
import { DeviceInfo } from 'ngx-device-detector';
import { Observable } from 'rxjs';

import { GlobalVars } from 'app/globalVars';
import { ILoginSonuc, User } from 'models/user';

@Injectable({ providedIn: 'root' })

export class AuthenticationService {
  constructor(
    private httpClient: HttpClient
  ) { }

  login(ePostaAdresi: string, sifre: string, deviceInfo: DeviceInfo, isMobile: boolean, isTablet: boolean, isDesktop: boolean): Observable<ILoginSonuc> {
    const body = JSON.stringify({ ePostaAdresi, sifre, deviceInfo, isMobile, isTablet, isDesktop });

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer 1837837'
    });

    return this.httpClient.post<ILoginSonuc>(GlobalVars.checkLoginURL, body, { headers });
  }

  sifreDegistir(ePostaAdresi: string, sifre: string, token: string): Observable<IKayitIslemiSonuc> {
    const body = JSON.stringify({ sifre });

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      ePostaAdresi: encodeURI(ePostaAdresi),
      Authorization: token
    });

    return this.httpClient.post<IKayitIslemiSonuc>(GlobalVars.sifreDegistirURL, body, { headers });
  }

  sifremiUnuttum(ePostaAdresi: string, deviceInfo: DeviceInfo, isMobile: boolean, isTablet: boolean, isDesktop: boolean): Observable<IKayitIslemiSonuc> {
    const body = JSON.stringify({ ePostaAdresi, deviceInfo, isMobile, isTablet, isDesktop });

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer 1837837'
    });

    return this.httpClient.post<IKayitIslemiSonuc>(GlobalVars.sifremiUnuttumURL, body, { headers });
  }


  yeniKullanici(ePostaAdresi: string, sifre: string): Observable<IKayitIslemiSonuc> {
    const body = JSON.stringify({ ePostaAdresi, sifre });

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer 1837837'
    });

    return this.httpClient.post<IKayitIslemiSonuc>(GlobalVars.yeniKullaniciURL, body, { headers });
  }

  sifreDegistirSecenekler(ePostaAdresi: string, token: string): Observable<SifreSecenekleri> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      ePostaAdresi: encodeURI(ePostaAdresi),
      Authorization: 'Bearer ' + token
    });

    return this.httpClient.get<SifreSecenekleri>(GlobalVars.sifreDegistirSeceneklerURL, { headers });
  }

  logout(currentUser: User): Observable<IKayitIslemiSonuc> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      kullaniciId: currentUser.kullaniciId,
      Authorization: 'Bearer ' + currentUser.token
    });

    console.info('logout: ' + GlobalVars.logoutURL + ': ' + currentUser.kullaniciId);
    return this.httpClient.post<IKayitIslemiSonuc>(GlobalVars.logoutURL, '', { headers });
  }

  checkToken(kullaniciId: number, token: string, deviceInfo: DeviceInfo, isMobile: boolean, isTablet: boolean, isDesktop: boolean): Observable<ILoginSonuc> {
    const body = JSON.stringify({ kullaniciId, token, deviceInfo, isMobile, isTablet, isDesktop });

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer 1837837'
    });

    return this.httpClient.post<ILoginSonuc>(GlobalVars.checkTokenURL, body, { headers });
  }

}
