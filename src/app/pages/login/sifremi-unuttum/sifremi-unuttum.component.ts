import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { DeviceDetectorService, DeviceInfo } from 'ngx-device-detector';
import { Message } from 'primeng/api/message';

import { GlobalVars } from 'app/globalVars';
import { AuthenticationService } from 'services/authentication.service';
import { SpinnerService } from 'shared/spinner/spinner.service';

@Component({
  selector: 'sifremi-unuttum',
  templateUrl: 'sifremi-unuttum.component.html',
  styleUrl: '../login.scss'
})

export class SifremiUnuttumComponent {
  form: FormGroup;
  kullaniciKodu: FormControl;
  error: Message[] = [];
  girisDugmeGorunur = false;
  bgLoginImageVariable = GlobalVars.getLoginBackgroundImageURL; // + '&TemaNo=' + GlobalFunctions.temaGunNoVer().toString();

  private submitted = false;

  constructor(
    private authenticationService: AuthenticationService,
    private deviceService: DeviceDetectorService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private spinnerService: SpinnerService,
    private titleService: Title
  ) {
    this.titleService.setTitle(GlobalVars.programAdi + ' - Şifremi Unuttum');

    this.form = formBuilder.group({
      kullaniciKodu: ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });

    this.kullaniciKodu = <FormControl>this.form.controls['kullaniciKodu'];
    if (this.route.snapshot.paramMap.get('kullaniciKodu') !== '') {
      this.kullaniciKodu.setValue(this.route.snapshot.paramMap.get('kullaniciKodu'));
    }

  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.valid) {
      this.sifremiUnuttum(this.kullaniciKodu.value);
    }
  }

  private sifremiUnuttum(kullaniciKodu: string) {
    this.spinnerService.start();
    this.dismissAlert();
    const deviceInfo: DeviceInfo = this.deviceService.getDeviceInfo();
    const isMobile = this.deviceService.isMobile();
    const isTablet = this.deviceService.isTablet();
    const isDesktop = this.deviceService.isDesktop();

    this.authenticationService.sifremiUnuttum(kullaniciKodu, deviceInfo, isMobile, isTablet, isDesktop)
      .subscribe({
        next: (sifremiUnuttumSonuc) => {
          this.spinnerService.stop();
          if (sifremiUnuttumSonuc.kayitBasarili) {
            this.error = [{ severity: 'info', summary: 'Bilgi', detail: 'Şifre sıfırlama e-postanız gönderildi.' }];
            this.girisDugmeGorunur = true;
          } else {
            this.error = [{ severity: 'error', summary: 'Hata', detail: sifremiUnuttumSonuc.kayitMesaj }];
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
