import { Injectable } from '@angular/core';

import { SelectItem } from 'primeng/api/selectitem';
import { TooltipOptions } from 'primeng/api/tooltipoptions';

@Injectable({ providedIn: 'root' })

export class GlobalVars {
  static programAdi = 'Şifre Kaydedici';
  static ajansKodu = 'Limit';
  static serverURL = 'http://localhost/';
  static programSurum = '0.0.1';

  static primaryColor = '#388fa1';
  static logoColor = '#388fa1';
  static menuSelectedColor = '#388fa1';

  static aktifTema = 1;
  static temaGun = 1;

  static temalar: SelectItem<number>[] = [{ label: 'Deniz', value: 1 }, { label: 'Çöl', value: 2 }, { label: 'Çiçek', value: 3 }, { label: 'Tarla', value: 4 }, { label: 'Ateş', value: 5 }, { label: 'Koyu', value: 6 }];

  static getBackgroundImageURL = '/assets/images/background/Tema1_1.jpg';
  static getLoginBackgroundImageURL = '/assets/images/background/Login1.webp';
  static getMenuIconURL = GlobalVars.serverURL + 'W_GetMenuIcon/';
  static getAjansLogoURL = GlobalVars.serverURL + 'W_GetAjansLogo/';
  static getMecraLogoURL = GlobalVars.serverURL + 'W_GetMecraLogo/';
  static getProgramLogoURL = GlobalVars.serverURL + 'W_GetProgramLogo/';

  static getKullaniciResimURL = GlobalVars.serverURL + 'W_GetKullaniciResim/';

  static getDocumentIconURL = GlobalVars.serverURL + 'W_GetDocumentIcon/';
  static logoYukleURL = GlobalVars.serverURL + 'WJ_LogoYukle';
  static kullaniciResimURL = GlobalVars.serverURL + 'WJ_KullaniciLogo';
  static checkLoginURL = GlobalVars.serverURL + 'WJ_CheckLogin';
  static checkTokenURL = GlobalVars.serverURL + 'WJ_CheckToken';
  static getUserDetailsURL = GlobalVars.serverURL + 'WJ_GetUserDetails';
  static sifremiUnuttumURL = GlobalVars.serverURL + 'WJ_SifremiUnuttum';
  static yeniKullaniciURL = GlobalVars.serverURL + 'WJ_YeniKullanici';
  static favorilerURL = GlobalVars.serverURL + 'WJ_Favoriler';
  static favoriURL = GlobalVars.serverURL + 'WJ_Favori';
  static favoriEkleSilURL = GlobalVars.serverURL + 'WJ_FavoriEkleSil';
  static favoriKaydetURL = GlobalVars.serverURL + 'WJ_FavoriKaydet';
  static ozetURL = GlobalVars.serverURL + 'WJ_Ozet';
  static sutunSecimiYukleURL = GlobalVars.serverURL + 'WJ_SutunSecimiYukle';
  static sutunSecimiKaydetURL = GlobalVars.serverURL + 'WJ_SutunSecimiKaydet';
  static getUserMenusURL = GlobalVars.serverURL + 'WJ_GetUserMenus';
  static getUserMenuExtrasURL = GlobalVars.serverURL + 'WJ_GetUserMenuExtras';
  static bildirimListeURL = GlobalVars.serverURL + 'WJ_Bildirimler';
  static bildirimGorulmeyenAdetURL = GlobalVars.serverURL + 'WJ_BildirimlerGorulmeyenAdet';

  static logoutURL = GlobalVars.serverURL + 'WJ_Logout';
  static secenekKaydetURL = GlobalVars.serverURL + 'WJ_SecenekKaydet';
  static dilKaydetURL = GlobalVars.serverURL + 'WJ_DilKaydet';
  static sifreDegistirURL = GlobalVars.serverURL + 'WJ_SifreDegistir';
  static sifreDegistirSeceneklerURL = GlobalVars.serverURL + 'WJ_SifreDegistirSecenekler';

  static karakter = /[a-zçÇğĞıİöÖşŞüÜ]/i;
  static karakterRakam = /[a-z0-9çÇğĞıİöÖşŞüÜ]/i;
  static karakterRakamBosluk = /[a-z0-9 çÇğĞıİöÖşŞüÜ]/i;
  static responsiveWidthKucuk = { width: '100%', 'min-width': '12em' };
  static standartTooltipOptions: TooltipOptions = { tooltipZIndex: '100000', showDelay: 1000, tooltipPosition: 'bottom' };
}
