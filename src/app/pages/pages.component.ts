import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Routes } from '@angular/router';

import { Bildirimler } from 'limitng/api/models/bildirimler';
import { LimitMenu } from 'limitng/api/models/ortak';
import { MessageService } from 'primeng/api';

import { User } from 'models/user';
import { UserService } from 'services/user.service';
import { SpinnerService } from 'shared/spinner/spinner.service';
import { BaMenuService } from '../theme/services/baMenu/baMenu.service';

@Component({
  selector: 'pages',
  templateUrl: 'pages.component.html'
})

export class PagesComponent implements OnInit {
  bildirimler: Bildirimler;

  private menuler: LimitMenu[];
  private currentUser: User;

  constructor(
    private _menuService: BaMenuService,
    private messageService: MessageService,
    private spinnerService: SpinnerService,
    private userService: UserService
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.userService.getUserMenus(this.currentUser)
      .subscribe({
        next: (userMenu) => {
          this.menuler = userMenu.menuler;
          this._menuService.updateMenuByRoutes(<Routes>this.menuler);
        },
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
