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
      kullaniciId: currentUser.kullaniciId,
      Authorization: 'Bearer ' + currentUser.token
    });

    return this.httpClient.get<User>(GlobalVars.getUserMenusURL, { headers });
  }

  getUserMenuExtras(currentUser: User): Observable<ExtraRoutes> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      kullaniciId: currentUser.kullaniciId,
      Authorization: 'Bearer ' + currentUser.token
    });

    return this.httpClient.get<ExtraRoutes>(GlobalVars.getUserMenuExtrasURL, { headers });
  }

  getUserDetails(kullaniciId: number, token: string): Observable<User> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      kullaniciId: kullaniciId,
      Authorization: 'Bearer ' + token
    });

    return this.httpClient.get<User>(GlobalVars.getUserDetailsURL, { headers });
  }

  getNotificationGorulmeyenAdet(currentUser: User): Observable<Bildirimler> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      kullaniciId: currentUser.kullaniciId,
      Authorization: 'Bearer ' + currentUser.token
    });

    return this.httpClient.get<Bildirimler>(GlobalVars.bildirimGorulmeyenAdetURL, { headers });
  }

  secenekKaydet(currentUser: User): Observable<IKayitIslemiSonuc> {
    const body = JSON.stringify(currentUser.secenekler);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      kullaniciId: currentUser.kullaniciId,
      Authorization: 'Bearer ' + currentUser.token
    });

    return this.httpClient.post<IKayitIslemiSonuc>(GlobalVars.secenekKaydetURL, body, { headers });
  }

  dilKaydet(currentUser: User, dil: string): Observable<IKayitIslemiSonuc> {
    const body = JSON.stringify({ dil });

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      kullaniciId: currentUser.kullaniciId,
      Authorization: 'Bearer ' + currentUser.token
    });

    return this.httpClient.post<IKayitIslemiSonuc>(GlobalVars.dilKaydetURL, body, { headers });
  }

}
