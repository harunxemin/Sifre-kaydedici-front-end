import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { IKayitIslemiSonuc, IKilitKayitSonuc, ISilmeIslemiSonuc, KilitParametreleri } from 'limitng/api/models/ortak';
import { Observable } from 'rxjs';

import { GlobalVars } from 'app/globalVars';
import { User } from 'models/user';

@Injectable({ providedIn: 'root' })

export class SessionService {
  constructor(
    private httpClient: HttpClient
  ) { }

  createRecord(currentUser: User, kilitParametreleri: KilitParametreleri): Observable<IKilitKayitSonuc> {
    const body = JSON.stringify(kilitParametreleri);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      kullaniciKodu: encodeURI(currentUser.kullaniciKodu),
      Authorization: 'Bearer ' + currentUser.token
    });

    return this.httpClient.post<IKilitKayitSonuc>(GlobalVars.kilitOlusturURL, body, { headers });
  }

  updateRecord(currentUser: User, kilitParametreleri: KilitParametreleri): Observable<IKayitIslemiSonuc> {
    const body = JSON.stringify(kilitParametreleri);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      kullaniciKodu: encodeURI(currentUser.kullaniciKodu),
      Authorization: 'Bearer ' + currentUser.token
    });

    return this.httpClient.post<IKayitIslemiSonuc>(GlobalVars.kilitGuncelleURL, body, { headers });
  }

  deleteRecord(currentUser: User, UUID: string): Observable<ISilmeIslemiSonuc> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      kullaniciKodu: encodeURI(currentUser.kullaniciKodu),
      Authorization: 'Bearer ' + currentUser.token
    });

    return this.httpClient.delete<ISilmeIslemiSonuc>(GlobalVars.kilitSilURL + '/' + UUID, { headers });
  }
}

