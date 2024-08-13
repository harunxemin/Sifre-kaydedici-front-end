import { LimitMenu } from 'limitng/api/models/ortak';

export class User {
  kullaniciId = 0;
  kullaniciAdiSoyadi = '';
  kullaniciAdi = '';
  kullaniciSoyadi = '';
  ePostaAdresi = '';
  password = '';
  kullaniciResimURL = '';
  token = '';
  loginMesaj = '';
  connected = false;
  menuler: LimitMenu[];
  ajansKodu = '';
  dil = 'tr-TR';
  secenekler: Secenekler;
  limitCalisani = false;
}

export class Secenekler {
  sifreOrijinal = '';
}

export interface ILoginSonuc {
  islemBasarili: boolean;
  kullaniciId: number;
  mesaj: string;
  token: string;
}
