import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { Message } from 'primeng/api/message';

import { GlobalVars } from 'app/globalVars';
import { AuthenticationService } from 'services/authentication.service';
import { SpinnerService } from 'shared/spinner/spinner.service';
import { EqualPasswordsValidator } from 'app/theme/validators/equalPasswords.validator';

@Component({
  selector: 'yeni-kullanici',
  templateUrl: 'yeni-kullanici.component.html',
  styleUrl: '../login.scss'
})

export class YeniKullaniciComponent {
  form: FormGroup;
  ePostaAdresi: FormControl;
  sifre: FormControl;
  sifreTekrar: FormControl;
  error: Message[] = [];
  girisDugmeGorunur = false;
  bgLoginImageVariable = GlobalVars.getLoginBackgroundImageURL; // + '&TemaNo=' + GlobalFunctions.temaGunNoVer().toString();

  private submitted = false;

  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private spinnerService: SpinnerService,
    private titleService: Title
  ) {
    this.titleService.setTitle(GlobalVars.programAdi + ' - Yeni Kullanıcı');

    this.form = formBuilder.group({
      ePostaAdresi: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      sifre: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      sifreTekrar: ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });
    this.form.addValidators(EqualPasswordsValidator.validate('sifre', 'sifreTekrar'));
    this.ePostaAdresi = <FormControl>this.form.controls['ePostaAdresi'];

  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.valid) {
      this.yeniKullanici(this.ePostaAdresi.value, this.sifre.value);
    }
  }

  private yeniKullanici(ePostaAdresi: string, sifre: string) {
    this.spinnerService.start();
    this.dismissAlert();

    this.authenticationService.yeniKullanici(ePostaAdresi, sifre)
      .subscribe({
        next: (yeniKullaniciSonuc) => {
          this.spinnerService.stop();
          if (yeniKullaniciSonuc.kayitBasarili) {
            this.error = [{ severity: 'info', summary: 'Bilgi', detail: 'Şifre sıfırlama e-postanız gönderildi.' }];
            this.girisDugmeGorunur = true;
          } else {
            this.error = [{ severity: 'error', summary: 'Hata', detail: yeniKullaniciSonuc.kayitMesaj }];
          }
        },
        error: (error: HttpErrorResponse) => {
          if (error.ok) {
            this.error = [{ severity: 'error', summary: 'Hata', detail: error.statusText }];
          } else {
            this.error = [{ severity: 'error', summary: 'Hata', detail: 'Sunucu bağlantısı sağlanamadı' }];
          }
          this.spinnerService.stop();
        }
      });
  }

  dismissAlert() {
    this.error = [];
  }
}
