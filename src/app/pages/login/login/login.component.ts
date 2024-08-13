import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewEncapsulation, viewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { DeviceDetectorService, DeviceInfo } from 'ngx-device-detector';
import { MessageService } from 'primeng/api';
import { Message } from 'primeng/api/message';
import { CarouselPageEvent } from 'primeng/carousel';

import { GlobalVars } from 'app/globalVars';
import { ThemeService } from 'app/theme/services/theme.service';
import { Secenekler } from 'models/user';
import { AuthenticationService } from 'services/authentication.service';
import { UserService } from 'services/user.service';
import { SpinnerService } from 'shared/spinner/spinner.service';
import { IAjansLogo } from '../models/login';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrl: '../login.scss',
  encapsulation: ViewEncapsulation.None
})

export class LoginComponent implements OnInit {
  inputEmail = viewChild<ElementRef<HTMLInputElement>>('inputEmail');
  inputSifre = viewChild<ElementRef<HTMLInputElement>>('inputSifre');

  ajansLogolar: IAjansLogo[] = [];
  numofPage = 0;
  form: FormGroup;
  ePostaAdresi: FormControl;
  sifre: FormControl;
  error: Message[] = [];
  bgLoginImageVariable = GlobalVars.getLoginBackgroundImageURL; // + '&TemaNo=' + GlobalFunctions.temaGunNoVer().toString();

  seciliTema = '1';

  private submitted = false;
  private model: any = {};
  private returnUrl: string;

  constructor(
    private authenticationService: AuthenticationService,
    private deviceService: DeviceDetectorService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private spinnerService: SpinnerService,
    private themeService: ThemeService,
    private titleService: Title,
    private userService: UserService
  ) {
    this.titleService.setTitle(GlobalVars.programAdi + ' - Sisteme Giriş');
    this.form = formBuilder.group({
      ePostaAdresi: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      sifre: ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });

    this.ePostaAdresi = <FormControl>this.form.controls['ePostaAdresi'];
    if (this.route.snapshot.paramMap.get('ePostaAdresi') !== '') {
      this.ePostaAdresi.setValue(this.route.snapshot.paramMap.get('ePostaAdresi'));
    }
    this.sifre = <FormControl>this.form.controls['sifre'];
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    delete this.userService.setCurrentUser;

    if (this.ePostaAdresi.value === null) {
      setTimeout(() => {
        this.inputEmail().nativeElement.focus();
      }, 0);
    } else {
      setTimeout(() => {
        this.inputSifre().nativeElement.focus();
      }, 0);
    }
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.valid) {
      this.login(this.ePostaAdresi.value, this.sifre.value);
    }
  }

  dismissAlert() {
    this.error = [];
  }

  private login(ePostaAdresi: string, sifre: string) {
    this.spinnerService.start();
    this.dismissAlert();
    const deviceInfo: DeviceInfo = this.deviceService.getDeviceInfo();
    const isMobile = this.deviceService.isMobile();
    const isTablet = this.deviceService.isTablet();
    const isDesktop = this.deviceService.isDesktop();

    this.authenticationService.login(ePostaAdresi, sifre, deviceInfo, isMobile, isTablet, isDesktop)
      .subscribe({
        next: (loginSonuc) => {
          if (loginSonuc.islemBasarili) {
            this.userService.getUserDetails(loginSonuc.kullaniciId, loginSonuc.token)
              .subscribe({
                next: (userDetails) => {
                  this.userService.setCurrentUser(userDetails);
                  this.spinnerService.stop();
                  this.userService.currentUser
                    .subscribe({
                      next: (userData) => {
                        userData.token = loginSonuc.token;
                        userData.connected = true;
                        this.themeService.setActiveThem('tema_1');
                        if (userData) {
                          if (typeof userData.secenekler === 'undefined') {
                            userData.secenekler = new Secenekler();
                          }

                          localStorage.setItem('currentUser', JSON.stringify(userData));
                          // login successful so redirect to return url
                          this.router.navigate([this.returnUrl]);
                        }
                      }
                    });
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
          } else {
            this.error = [{ severity: 'error', summary: 'Hata', detail: loginSonuc.mesaj }];
            this.spinnerService.stop();
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

  pageChanged(event: CarouselPageEvent) {
    this.numofPage = event.page;
  }
}
