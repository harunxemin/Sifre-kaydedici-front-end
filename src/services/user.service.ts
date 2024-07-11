import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Bildirimler } from 'limitng/api/models/bildirimler';
import { ExtraRoutes, IKayitIslemiSonuc, ISilmeIslemiSonuc } from 'limitng/api/models/ortak';
import { RaporDetaylari } from 'limitng/api/models/raporlar/rapordetaylari/raporDetaylari';
import { Observable, ReplaySubject } from 'rxjs';

import { GlobalVars } from 'app/globalVars';
import { User } from 'models/user';

@Injectable({ providedIn: 'root' })

export class UserService {
  currentUser: ReplaySubject<User> = new ReplaySubject<User>();

  constructor(
    private httpClient: HttpClient
  ) { }

  setCurrentUser(user: User) {
    this.currentUser.next(user);
  }

  getUserMenus(currentUser: User): Observable<User> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      kullaniciKodu: encodeURI(currentUser.kullaniciKodu),
      Authorization: 'Bearer ' + currentUser.token
    });

    return this.httpClient.get<User>(GlobalVars.getUserMenusURL, { headers });
  }

  getUserMenuExtras(currentUser: User): Observable<ExtraRoutes> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      kullaniciKodu: encodeURI(currentUser.kullaniciKodu),
      Authorization: 'Bearer ' + currentUser.token
    });

    return this.httpClient.get<ExtraRoutes>(GlobalVars.getUserMenuExtrasURL, { headers });
  }

  getUserDetails(kullaniciKodu: string, token: string): Observable<User> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      kullaniciKodu: encodeURI(kullaniciKodu),
      Authorization: 'Bearer ' + token
    });

    return this.httpClient.get<User>(GlobalVars.getUserDetailsURL, { headers });
  }

  getNotifications(currentUser: User): Observable<Bildirimler> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      kullaniciKodu: encodeURI(currentUser.kullaniciKodu),
      Authorization: 'Bearer ' + currentUser.token
    });

    return this.httpClient.get<Bildirimler>(GlobalVars.bildirimListeURL, { headers });
  }

  getNotificationGorulmeyenAdet(currentUser: User): Observable<Bildirimler> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      kullaniciKodu: encodeURI(currentUser.kullaniciKodu),
      Authorization: 'Bearer ' + currentUser.token
    });

    return this.httpClient.get<Bildirimler>(GlobalVars.bildirimGorulmeyenAdetURL, { headers });
  }

  notificationDetaylari(currentUser: User, raporID: number): Observable<RaporDetaylari> {
    const params = new HttpParams()
      .set('raporID', raporID.toString());

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      kullaniciKodu: encodeURI(currentUser.kullaniciKodu),
      Authorization: 'Bearer ' + currentUser.token
    });

    return this.httpClient.get<RaporDetaylari>(GlobalVars.raporDetayURL, { headers, params });
  }

  raporSil(currentUser: User, raporID: number): Observable<ISilmeIslemiSonuc> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      kullaniciKodu: encodeURI(currentUser.kullaniciKodu),
      Authorization: 'Bearer ' + currentUser.token
    });

    return this.httpClient.delete<ISilmeIslemiSonuc>(GlobalVars.raporSilURL + '/' + raporID.toString(), { headers });
  }

  raporGonder(currentUser: User, raporID: number): Observable<IKayitIslemiSonuc> {
    const body = JSON.stringify({ raporID });

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      kullaniciKodu: encodeURI(currentUser.kullaniciKodu),
      Authorization: 'Bearer ' + currentUser.token
    });

    return this.httpClient.post<IKayitIslemiSonuc>(GlobalVars.raporGonderURL, body, { headers });
  }

  secenekKaydet(currentUser: User): Observable<IKayitIslemiSonuc> {
    const body = JSON.stringify(currentUser.secenekler);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      kullaniciKodu: encodeURI(currentUser.kullaniciKodu),
      Authorization: 'Bearer ' + currentUser.token
    });

    return this.httpClient.post<IKayitIslemiSonuc>(GlobalVars.secenekKaydetURL, body, { headers });
  }

  dilKaydet(currentUser: User, dil: string): Observable<IKayitIslemiSonuc> {
    const body = JSON.stringify({ dil });

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      kullaniciKodu: encodeURI(currentUser.kullaniciKodu),
      Authorization: 'Bearer ' + currentUser.token
    });

    return this.httpClient.post<IKayitIslemiSonuc>(GlobalVars.dilKaydetURL, body, { headers });
  }

}
