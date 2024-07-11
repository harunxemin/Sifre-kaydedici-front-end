import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { IKayitIslemiSonuc, ISutunSecimiAlanlar, ISutunSecimiSutunlar } from 'limitng/api/models/ortak';
import { Observable } from 'rxjs';

import { GlobalVars } from 'app/globalVars';

@Injectable({ providedIn: 'root' })

export class SutunSecimiService {
  constructor(
    private httpClient: HttpClient
  ) { }

  kaydet(kullaniciKodu: string, token: string, modelAdi: string, seciliSutunlar: ISutunSecimiSutunlar[], paginatorGorunur: boolean, paginatorSatirAdet: number): Observable<IKayitIslemiSonuc> {
    const sutunlar = seciliSutunlar.map(element => element.alanAdi);
    const body = JSON.stringify({ modelAdi, paginatorGorunur, paginatorSatirAdet, seciliSutunlar: sutunlar });

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      kullaniciKodu: encodeURI(kullaniciKodu),
      Authorization: 'Bearer ' + token
    });

    return this.httpClient.post<IKayitIslemiSonuc>(GlobalVars.sutunSecimiKaydetURL, body, { headers });
  }

  yukle(kullaniciKodu: string, token: string, modelAdi: string): Observable<ISutunSecimiAlanlar> {
    const params = new HttpParams()
      .set('modelAdi', modelAdi);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      kullaniciKodu: encodeURI(kullaniciKodu),
      Authorization: 'Bearer ' + token
    });

    return this.httpClient.get<ISutunSecimiAlanlar>(GlobalVars.sutunSecimiYukleURL, { headers, params });
  }

}
