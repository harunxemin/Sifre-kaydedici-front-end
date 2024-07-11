import { Injectable } from '@angular/core';

import { SelectItem } from 'primeng/api/selectitem';
import { TooltipOptions } from 'primeng/api/tooltipoptions';

@Injectable({ providedIn: 'root' })

export class GlobalVars {
  static programAdi = 'Şifre Kaydedici';
  static ajansKodu = 'Limit';
  static serverURL = 'https://medplan.com.tr/';
  static programSurum = '0.6.3';

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
  static getProgramReferansLogoURL = GlobalVars.serverURL + 'W_GetProgramReferansLogo/';
  static getLimitElemanPictureURL = GlobalVars.serverURL + 'W_GetLimitElemanPicture/';

  static getKullaniciResimURL = GlobalVars.serverURL + 'W_GetKullaniciResim/';

  static getDocumentIconURL = GlobalVars.serverURL + 'W_GetDocumentIcon/';
  static logoYukleURL = GlobalVars.serverURL + 'WJ_LogoYukle';
  static prototipYukleURL = GlobalVars.serverURL + 'WJ_PrototipYukle';
  static kullaniciResimURL = GlobalVars.serverURL + 'WJ_KullaniciLogo';
  static mecraResimURL = GlobalVars.serverURL + 'WJ_MecraResim';
  static checkLoginURL = GlobalVars.serverURL + 'WJ_CheckLogin';
  static checkTokenURL = GlobalVars.serverURL + 'WJ_CheckToken';
  static getUserDetailsURL = GlobalVars.serverURL + 'WJ_GetUserDetails';
  static sifremiUnuttumURL = GlobalVars.serverURL + 'WJ_SifremiUnuttum';
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
  static raporIndirURL = GlobalVars.serverURL + 'WJ_RaporIndir';
  static raporDetayURL = GlobalVars.serverURL + 'WJ_RaporDetaylari';
  static raporSilURL = GlobalVars.serverURL + 'WJ_RaporSil';
  static raporGonderURL = GlobalVars.serverURL + 'WJ_RaporGonder';

  static logoutURL = GlobalVars.serverURL + 'WJ_Logout';
  static secenekKaydetURL = GlobalVars.serverURL + 'WJ_SecenekKaydet';
  static dilKaydetURL = GlobalVars.serverURL + 'WJ_DilKaydet';
  static sifreDegistirURL = GlobalVars.serverURL + 'WJ_SifreDegistir';
  static sifreDegistirSeceneklerURL = GlobalVars.serverURL + 'WJ_SifreDegistirSecenekler';

  static raporZamanlaURL = GlobalVars.serverURL + 'WJ_RaporZamanla';

  static referanslarURL = GlobalVars.serverURL + 'WJ_Referanslar';
  static referanslarUniqueURL = GlobalVars.serverURL + 'WJ_ReferanslarUnique';

  static ayarlarURL = GlobalVars.serverURL + 'WJ_Ayarlar';
  static ayarKaydetURL = GlobalVars.serverURL + 'WJ_AyarKaydet';

  static mecraIslemleriURL = GlobalVars.serverURL + 'WJ_MecraIslemleri';
  static mecraDetaylariURL = GlobalVars.serverURL + 'WJ_MecraDetaylari';
  static mecraKaydetURL = GlobalVars.serverURL + 'WJ_MecraKaydet';
  static mecraSilURL = GlobalVars.serverURL + 'WJ_MecraSil';
  static dosyaYukleURL = GlobalVars.serverURL + 'WJ_DosyaYukle';

  static kullaniciIslemleriURL = GlobalVars.serverURL + 'WJ_KullaniciIslemleri';
  static kullaniciDetaylariURL = GlobalVars.serverURL + 'WJ_KullaniciDetaylari';
  static kullaniciKaydetURL = GlobalVars.serverURL + 'WJ_KullaniciKaydet';
  static kullaniciSilURL = GlobalVars.serverURL + 'WJ_KullaniciSil';
  static kullaniciMailURL = GlobalVars.serverURL + 'WJ_KullaniciMail';

  static ajansIslemleriURL = GlobalVars.serverURL + 'WJ_AjansIslemleri';
  static ajansDetaylariURL = GlobalVars.serverURL + 'WJ_AjansDetaylari';
  static ajansListesiGuncelleURL = GlobalVars.serverURL + ' WJ_AjansListesiGuncelle';
  static ajansKaydetURL = GlobalVars.serverURL + 'WJ_AjansKaydet';

  static hedefKitleIslemleriURL = GlobalVars.serverURL + 'WJ_HedefKitleIslemleri';
  static hedefKitleDetaylariURL = GlobalVars.serverURL + 'WJ_HedefKitleDetaylari';
  static hedefKitleListesiGuncelleURL = GlobalVars.serverURL + ' WJ_HedefKitleListesiGuncelle';

  static prototipIslemleriURL = GlobalVars.serverURL + 'WJ_PrototipIslemleri';
  static prototipDetaylariURL = GlobalVars.serverURL + 'WJ_PrototipDetaylari';
  static prototipKaydetURL = GlobalVars.serverURL + 'WJ_PrototipKaydet';
  static prototipSilURL = GlobalVars.serverURL + 'WJ_PrototipSil';
  static prototipPanodanAlURL = GlobalVars.serverURL + 'WJ_PrototipPanodanAl';

  static tekliflerURL = GlobalVars.serverURL + 'WJ_Teklifler';
  static teklifDetaylariURL = GlobalVars.serverURL + 'WJ_TeklifDetaylari';
  static teklifEkGosterURL = GlobalVars.serverURL + 'WJ_TeklifEkGoster';
  static teklifKaydetURL = GlobalVars.serverURL + 'WJ_TeklifKaydet';
  static teklifBelgeYukleURL = GlobalVars.serverURL + 'WJ_TeklifBelgeYukle';

  static kilitOlusturURL = GlobalVars.serverURL + 'WJ_KilitOlustur';
  static kilitGuncelleURL = GlobalVars.serverURL + 'WJ_KilitGuncelle';
  static kilitSilURL = GlobalVars.serverURL + 'WJ_KilitSil';

  static logbookInceleURL = GlobalVars.serverURL + 'WJ_Logbook';

  static sistemOzetURL = GlobalVars.serverURL + 'WJ_SistemOzet';
  static sistemProcessDataURL = GlobalVars.serverURL + 'WJ_SistemProcessData';
  static sistemWebOturumURL = GlobalVars.serverURL + 'WJ_SistemWebOturumData';
  static sistemKilitliKayitURL = GlobalVars.serverURL + 'WJ_SistemKilitliKayitData';
  static sistemKilitliKayitDetayURL = GlobalVars.serverURL + 'WJ_SistemKilitliKayitDetay';
  static serverYenidenBaslatURL = GlobalVars.serverURL + 'WJ_ServerRestart';
  static sistemYeniBaglantiAyarlaURL = GlobalVars.serverURL + 'WJ_SistemYeniBaglantiAyarla';
  static sistemWebOturumSilURL = GlobalVars.serverURL + 'WJ_SistemWebOturumSil';
  static sistemWebTekrarliOturumSilURL = GlobalVars.serverURL + 'WJ_SistemWebTekrarliOturumSil';
  static sistemKullanimdakiKayitlarURL = GlobalVars.serverURL + 'WJ_SistemKullanimdakiKayitlar';
  static sistemKullanimdaSilURL = GlobalVars.serverURL + 'WJ_KullanimdaSil';

  static listeExcelURL = GlobalVars.serverURL + 'WJ_ListeExcel';
  static mailAdresleriURL = GlobalVars.serverURL + 'WJ_MailAdresleri';
  static excelURL = GlobalVars.serverURL + 'WJ_Excel';

  static yardimURL = GlobalVars.serverURL + 'WJ_Yardim';

  static karakter = /[a-zçÇğĞıİöÖşŞüÜ]/i;
  static karakterRakam = /[a-z0-9çÇğĞıİöÖşŞüÜ]/i;
  static karakterRakamBosluk = /[a-z0-9 çÇğĞıİöÖşŞüÜ]/i;
  static responsiveWidthKucuk = { width: '100%', 'min-width': '12em' };
  static standartTooltipOptions: TooltipOptions = { tooltipZIndex: '100000', showDelay: 1000, tooltipPosition: 'bottom' };
}
