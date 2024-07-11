import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Favori, FavoriEkleSilParametreleri, Favoriler, IKayitIslemiSonuc } from 'limitng/api/models/ortak';
import { Observable } from 'rxjs';

import { GlobalVars } from 'app/globalVars';
import { User } from 'models/user';
import { IOzetData } from './models/ozetData';

@Injectable({ providedIn: 'root' })

export class OzetService {
  constructor(
    private httpClient: HttpClient
  ) { }

  getOzetChartData(currentUser: User, listeKriter: string, yil: string): Observable<IOzetData> {
    const params = new HttpParams()
      .set('islem', 'aylikListe')
      .set('kriter', listeKriter)
      .set('yil', yil);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      kullaniciKodu: encodeURI(currentUser.kullaniciKodu),
      Authorization: 'Bearer ' + currentUser.token
    });

    return this.httpClient.get<IOzetData>(GlobalVars.ozetURL, { headers, params });
  }

  getOzetData(currentUser: User): Observable<IOzetData> {
    const params = new HttpParams()
      .set('islem', 'kartlar');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      kullaniciKodu: encodeURI(currentUser.kullaniciKodu),
      Authorization: 'Bearer ' + currentUser.token
    });

    return this.httpClient.get<IOzetData>(GlobalVars.ozetURL, { headers, params });
  }

  getFavori(currentUser: User, menu: string): Observable<Favori> {
    const params = new HttpParams()
      .set('menu', menu);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      kullaniciKodu: encodeURI(currentUser.kullaniciKodu),
      Authorization: 'Bearer ' + currentUser.token
    });

    return this.httpClient.get<Favori>(GlobalVars.favoriURL, { headers, params });
  }

  getFavoriler(currentUser: User): Observable<Favoriler> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      kullaniciKodu: encodeURI(currentUser.kullaniciKodu),
      Authorization: 'Bearer ' + currentUser.token
    });

    return this.httpClient.get<Favoriler>(GlobalVars.favorilerURL, { headers });
  }

  favoriEkleSil(currentUser: User, favoriBilgileri: Favori): Observable<IKayitIslemiSonuc> {
    const favoriEkleSilParametreleri = new FavoriEkleSilParametreleri();
    favoriEkleSilParametreleri.islem = favoriBilgileri.secili ? 'Ekle' : 'Sil';
    favoriEkleSilParametreleri.favori = favoriBilgileri;

    const body = JSON.stringify(favoriEkleSilParametreleri);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      kullaniciKodu: encodeURI(currentUser.kullaniciKodu),
      Authorization: 'Bearer ' + currentUser.token
    });

    return this.httpClient.post<IKayitIslemiSonuc>(GlobalVars.favoriEkleSilURL, body, { headers });
  }

  favoriKaydet(currentUser: User, favoriler: Favoriler): Observable<IKayitIslemiSonuc> {
    const body = JSON.stringify(favoriler);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      kullaniciKodu: encodeURI(currentUser.kullaniciKodu),
      Authorization: 'Bearer ' + currentUser.token
    });

    return this.httpClient.post<IKayitIslemiSonuc>(GlobalVars.favoriKaydetURL, body, { headers });
  }

}
