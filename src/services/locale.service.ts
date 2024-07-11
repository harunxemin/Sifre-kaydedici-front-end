import { Injectable } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';

import { UserService } from './user.service';

@Injectable()
export class LocaleService {
  constructor(
    private config: PrimeNGConfig,
    private translateService: TranslateService,
    private userService: UserService
  ) {

  }

  registerCulture(culture: string, kaydet: boolean) {
    if (!culture) {
      culture = 'tr-TR';
    }
    switch (culture) {
      case 'en-US': {
        console.info('Application Culture Set to English');
        break;
      }

      default: {
        culture = 'tr-TR';
        console.info('Uygulama dili Türkçe olarak ayarlandı');
        break;
      }
    }

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      currentUser.dil = culture;
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
    localStorage.setItem('dil', culture);
    this.translateService.use(culture).subscribe();
    this.translateService.get('primeng').subscribe(res => this.config.setTranslation(res));
    if (kaydet) {
      this.userService.dilKaydet(currentUser, culture)
        .subscribe();
    }
  }
}
