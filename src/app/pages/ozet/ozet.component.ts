import { moveItemInArray } from '@angular/cdk/drag-drop';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, Title } from '@angular/platform-browser';

import { GlobalFunctions } from 'limitng/api';
import { Favori, Favoriler } from 'limitng/api/models/ortak';
import { IOzetKartAlan } from 'limitng/api/models/ozet/ozetkartalan';
import { ConfirmationService, MessageService, PrimeIcons } from 'primeng/api';

import { GlobalVars } from 'app/globalVars';
import { User } from 'models/user';
import { SpinnerService } from 'shared/spinner/spinner.service';
import { OzetService } from './ozet.service';

@Component({
  selector: 'ozet',
  templateUrl: 'ozet.component.html',
  styleUrl: 'ozet.component.scss',
  encapsulation: ViewEncapsulation.None
})

export class OzetComponent implements OnInit {
  favorilerim = new Favoriler();
  ozetKartlar: IOzetKartAlan[] = [];
  aylikGrafikler: string[] = [];
  getMenuIconURL = GlobalVars.getMenuIconURL;
  favoriDuzenle = false;
  suruklenenFavori: Favori;

  private currentUser: User;

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private ozetService: OzetService,
    private spinnerService: SpinnerService,
    private titleService: Title,
    private sanitizer: DomSanitizer
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.titleService.setTitle(this.currentUser.kullaniciAdiSoyadi + ' - Özet');
  }

  get renk() {
    return GlobalVars.primaryColor;
  }

  get shadowSanitized() {
    let renkShadow = GlobalFunctions.colorNameToHex(this.renk);
    renkShadow = GlobalFunctions.shadeColor(renkShadow, -5);
    return this.sanitizer.bypassSecurityTrustStyle('inset 0 0 .35em .15em ' + renkShadow);
  }

  get renkSanitized() {
    let colorAlpha1 = GlobalFunctions.colorNameToHex(this.renk);
    colorAlpha1 = GlobalFunctions.hexToRGBA(colorAlpha1, 1);

    let colorAlpha05 = GlobalFunctions.colorNameToHex(this.renk);
    colorAlpha05 = GlobalFunctions.hexToRGBA(colorAlpha05, .5);

    return this.sanitizer.bypassSecurityTrustStyle('linear-gradient(45deg, ' + colorAlpha1 + ' 0%, ' + colorAlpha05 + ' 100%)');
  }

  ngOnInit() {
    this.ozetService.getOzetData(this.currentUser)
      .subscribe({
        next: (ozetData) => {
          this.ozetKartlar = ozetData.kartlar || [];
          this.aylikGrafikler = ozetData.aylikGrafikler || [];
        },
        error: (error: HttpErrorResponse) => {
          this.errorHandler(error);
        }
      });

    this.ozetService.getFavoriler(this.currentUser)
      .subscribe({
        next: (favoriler) => {
          this.favorilerim = favoriler;
          this.favorilerim.favoriler.forEach((favori, index) => favori.id = index)
        },
        error: (error: HttpErrorResponse) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Hata',
            detail: error.error
          });
        }
      });
  }

  favoriDragStart(favori: Favori) {
    this.suruklenenFavori = favori;
  }

  favoriDrop(favori: Favori) {
    if (this.suruklenenFavori) {
      const previousIndex = this.findIndex(this.suruklenenFavori);
      const currentIndex = this.findIndex(favori);
      if (previousIndex !== currentIndex) {
        moveItemInArray(this.favorilerim.favoriler, previousIndex, currentIndex);
        this.favoriKaydet();
      }
      this.suruklenenFavori = null;
    }
  }

  favoriDragEnd() {
    this.suruklenenFavori = null;
  }

  favoriSil(silinecekFavori: Favori) {
    this.confirmationService.confirm({
      key: 'ozetConfirm',
      acceptLabel: 'Evet',
      rejectLabel: 'Hayır',
      icon: PrimeIcons.QUESTION_CIRCLE,
      message: silinecekFavori.ad + '<br>isimli menü ögesini Favorilerinizden silmek istediğinize emin misiniz?',
      accept: () => {
        this.favorilerim.favoriler = this.favorilerim.favoriler.filter(favori => favori.id !== silinecekFavori.id);
        this.favoriKaydet();
      }
    });


  }

  findIndex(arananFavori: Favori) {
    return this.favorilerim.favoriler.indexOf(arananFavori);
  }

  private favoriKaydet() {
    this.ozetService.favoriKaydet(this.currentUser, this.favorilerim)
      .subscribe({
        error: (error: HttpErrorResponse) => {
          this.errorHandler(error);
        }
      });
  }

  private errorHandler(error: HttpErrorResponse) {
    this.spinnerService.stop();
    let mesaj: string;
    if (error instanceof Error) {
      mesaj = 'Bir hata oluştu: ' + error.message;
    } else {
      mesaj = 'Sunucu hatası oluştu: ' + error.error.message;
    }

    this.messageService.add({
      severity: 'error',
      summary: 'Hata',
      detail: mesaj
    });
    console.error(error);
  }
}
