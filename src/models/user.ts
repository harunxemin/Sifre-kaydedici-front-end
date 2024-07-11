import { LimitMenu } from 'limitng/api/models/ortak';

export class User {
  kullaniciKodu = '';
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

