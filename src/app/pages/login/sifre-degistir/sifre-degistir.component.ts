import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { GlobalFunctions } from 'limitng/api';
import { SifreSecenekleri } from 'limitng/api/models/login';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Message } from 'primeng/api/message';

import { GlobalVars } from 'app/globalVars';
import { EqualPasswordsValidator } from 'app/theme/validators/equalPasswords.validator';
import { AuthenticationService } from 'services/authentication.service';
import { SpinnerService } from 'shared/spinner/spinner.service';

@Component({
  selector: 'sifre-degistir',
  templateUrl: 'sifre-degistir.component.html',
  styleUrl: '../login.scss'
})

export class SifreDegistirComponent implements OnInit {
  form: FormGroup;
  sifre: FormControl;
  sifreTekrar: FormControl;
  error: Message[] = [];
  secenekler = new SifreSecenekleri();
  bgLoginImageVariable = GlobalVars.getLoginBackgroundImageURL; //  + '&TemaNo=' + GlobalFunctions.temaGunNoVer().toString();

  private ePostaAdresi = '';
  private token = '';

  constructor(
    private authenticationService: AuthenticationService,
    private confirmationService: ConfirmationService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private spinnerService: SpinnerService,
    private titleService: Title
  ) {
    this.titleService.setTitle(GlobalVars.programAdi + ' - Şifre Değiştirme');
    this.form = formBuilder.group({
      sifre: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      sifreTekrar: ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });

    this.form.addValidators(EqualPasswordsValidator.validate('sifre', 'sifreTekrar'));
    this.sifre = <FormControl>this.form.controls['sifre'];
    this.sifreTekrar = <FormControl>this.form.controls['sifreTekrar'];
  }

  ngOnInit() {
    this.ePostaAdresi = this.route.snapshot.paramMap.get('ePostaAdresi');
    this.token = this.route.snapshot.paramMap.get('token');
    this.authenticationService.sifreDegistirSecenekler(this.ePostaAdresi, this.token)
      .subscribe({
        next: (sonuc) => {
          this.secenekler = sonuc;

          if (this.secenekler.mesaj !== '') {
            this.error = [{ severity: 'error', summary: 'Hata', detail: this.secenekler.mesaj }];
          }

        },
        error: (error: HttpErrorResponse) => {
          this.errorHandler(error);
        }
      });
  }

  sifreDegistirCall(): void {
    if (this.form.valid) {
      if (this.sifreKontrol()) {
        this.sifreDegistir(this.ePostaAdresi, this.sifre.value);
      }
    }
  }

  private sifreKontrol(): boolean {
    let sonuc = true;
    const sifre = this.sifre.value;

    // Minimum uzunluk kontrolü
    if (this.secenekler.minimumUzunluk !== 0) {
      if (sifre.length < this.secenekler.minimumUzunluk) {
        this.error = [{ severity: 'error', summary: 'Hata', detail: 'Şifreniz en az ' + String(this.secenekler.minimumUzunluk) + ' karakter olmalı' }];
        sonuc = false;
      }
    }

    // Harf içersin kontrolü
    if (sonuc) {
      if (this.secenekler.harfIcersin) {
        const harfAdet = GlobalFunctions.harfAdetVer(sifre);

        if (harfAdet === 0) {
          this.error = [{ severity: 'error', summary: 'Hata', detail: 'Şifreniz en az bir harf içermeli' }];
          sonuc = false;
        }
      }
    }

    // Rakam içersin kontrolü
    if (sonuc) {
      if (this.secenekler.rakamIcersin) {
        const rakamAdet = GlobalFunctions.rakamAdetVer(sifre);

        if (rakamAdet === 0) {
          this.error = [{ severity: 'error', summary: 'Hata', detail: 'Şifreniz en az bir rakam içermeli' }];
          sonuc = false;
        }
      }
    }
    // Küçük büyük harf içersin kontrolü
    if (sonuc) {
      if (this.secenekler.buyukKucukHarfIcersin) {
        const buyukHarfAdet = GlobalFunctions.buyukHarfAdetVer(sifre);
        const kucukHarfAdet = GlobalFunctions.kucukHarfAdetVer(sifre);

        if ((buyukHarfAdet === 0) || (kucukHarfAdet === 0)) {
          this.error = [{ severity: 'error', summary: 'Hata', detail: 'Şifreniz hem büyük hem küçük harf içermeli' }];
          sonuc = false;
        }
      }

    }

    // @ içermesin kontrolü
    if (sonuc) {
      if (sifre.indexOf('@') > -1) {
        this.error = [{ severity: 'error', summary: 'Hata', detail: 'Şifre @ karakteri içermemeli.' }];
        sonuc = false;
      }
    }

    return sonuc;
  }

  private sifreDegistir(ePostaAdresi: string, sifre: string) {
    this.authenticationService.sifreDegistir(ePostaAdresi, sifre, this.token)
      .subscribe({
        next: (sifreDegistirSonuc) => {
          if (sifreDegistirSonuc.kayitBasarili) {
            this.confirmationService.confirm({
              key: 'sifreDegistirConfirm',
              acceptLabel: 'Tamam',
              rejectVisible: false,
              message: 'Şifreniz değiştirildi.<br>Giriş sayfasına yönlendirileceksiniz',
              accept: () => {
                this.router.navigate(['login', 'login']);
              }
            });
          } else {
            this.error = [{ severity: 'error', summary: 'Hata', detail: sifreDegistirSonuc.kayitMesaj }];
          }
        },
        error: (error: HttpErrorResponse) => {
          if (error.ok) {
            this.error = [{ severity: 'error', summary: 'Hata', detail: error.statusText }];
          } else {
            this.error = [{ severity: 'error', summary: 'Hata', detail: 'Sunucu bağlantısı sağlanamadı' }];
          }
        }
      });

  }

  dismissAlert() {
    this.error = [];
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
