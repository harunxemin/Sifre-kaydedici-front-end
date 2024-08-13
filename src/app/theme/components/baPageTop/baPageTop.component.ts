import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { GlobalFunctions } from 'limitng/api';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SelectItem } from 'primeng/api/selectitem';
import { Subscription, interval } from 'rxjs';

import { GlobalState } from 'app/global.state';
import { GlobalVars } from 'app/globalVars';
import { ThemeService } from 'app/theme/services/theme.service';
import { User } from 'models/user';
import { AuthenticationService } from 'services/authentication.service';
import { LocaleService } from 'services/locale.service';
import { UserService } from 'services/user.service';
import { SpinnerService } from 'shared/spinner/spinner.service';

@Component({
  selector: 'ba-page-top',
  templateUrl: 'baPageTop.component.html',
  styleUrl: 'baPageTop.component.scss'
})

export class BaPageTopComponent implements OnInit {
  programAdi = GlobalVars.programAdi;
  isScrolled = false;
  kartRenk = '#388fa1';
  surum = '';
  bildirimGorulmeyenAdet = 0;
  seciliTema = 0;
  renkSanitized: SafeStyle;
  shadowSanitized: SafeStyle;
  diller: SelectItem<string>[] = [{ label: 'tr', value: 'tr-TR' }, { label: 'en', value: 'en-US' }];
  seciliDil = 'tr-TR';
  currentUser: User = new User();

  private isMenuCollapsed = false;
  private bildirimTimer = interval(60000);
  private bildirimSubscription = new Subscription();

  constructor(
    private _state: GlobalState,
    private authenticationService: AuthenticationService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private localeService: LocaleService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private spinnerService: SpinnerService,
    private themeService: ThemeService,
    private userService: UserService
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.seciliTema = 1;
    this.seciliDil = this.currentUser.dil ?? 'tr-TR';

    this.temaChange();
    this.localeService.registerCulture(this.seciliDil, false);
    this.surum = GlobalVars.programSurum;
    this._state.subscribe('menu.isCollapsed', (isCollapsed: boolean) => {
      this.isMenuCollapsed = isCollapsed;
    });

    let colorAlpha1 = GlobalFunctions.colorNameToHex(this.kartRenk);
    colorAlpha1 = GlobalFunctions.hexToRGBA(colorAlpha1, 1);

    let colorAlpha05 = GlobalFunctions.colorNameToHex(this.kartRenk);
    colorAlpha05 = GlobalFunctions.hexToRGBA(colorAlpha05, .5);

    this.renkSanitized = this.sanitizer.bypassSecurityTrustStyle('linear-gradient(45deg, ' + colorAlpha1 + ' 0%, ' + colorAlpha05 + ' 100%)');

    let renkShadow = GlobalFunctions.colorNameToHex(this.kartRenk);
    renkShadow = GlobalFunctions.shadeColor(renkShadow, -5);
    this.shadowSanitized = this.sanitizer.bypassSecurityTrustStyle('inset 0 0 .35em .15em ' + renkShadow);

  }

  ngOnInit() {
    this.bildirimListesiGuncelle();

    this.bildirimSubscription = this.bildirimTimer
      .subscribe({
        next: () => {
          this.bildirimListesiGuncelle();
        }
      });
  }

  private bildirimListesiGuncelle() {
    this.userService.getNotificationGorulmeyenAdet(this.currentUser)
      .subscribe({
        next: (bildirimler) => {
          this.bildirimGorulmeyenAdet = bildirimler.gorulmeyenAdet;
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.bildirimSubscription.unsubscribe();
            this.authenticationService.logout(this.currentUser)
              .subscribe();

            localStorage.removeItem('currentUser');
            localStorage.clear();
            this.router.navigate(['login', 'logout', 'oturum']);

          } else {
            this.errorHandler(error);
          }
        }
      });
  }

  toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
    this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    return false;
  }

  scrolledChanged(isScrolled: boolean) {
    this.isScrolled = isScrolled;
  }

  dilDegistir() {
    this.localeService.registerCulture(this.seciliDil, true);
  }

  signOut() {

    this.confirmationService.confirm({
      key: 'baTopConfirm',
      message: 'Çıkış Yapmak istediğinizden Emin misiniz?',
      accept: () => {
        this.bildirimSubscription.unsubscribe();
        this.authenticationService.logout(this.currentUser)
          .subscribe();

        localStorage.removeItem('currentUser');
        localStorage.clear();
        this.router.navigate(['login', 'logout']);
      }
    });
  }

  temaChange() {
    // this.currentUser.temaNo = this.seciliTema;
    // localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    // this.userService.temaSecimKaydet(this.currentUser).subscribe();
    this.themeService.setActiveThem('tema_' + this.seciliTema.toString());
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
