import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { ConfirmationService } from 'primeng/api';

import { User } from 'models/user';
import { AuthenticationService } from 'services/authentication.service';

@Component({
  selector: 'cikis',
  templateUrl: 'cikis.component.html'
})

export class CikisComponent implements OnInit {
  private currentUser: User;

  constructor(
    private authenticationService: AuthenticationService,
    private titleService: Title,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.titleService.setTitle(this.currentUser.kullaniciAdiSoyadi + ' - Çıkış');
  }

  ngOnInit() {
    this.signOut();
  }

  signOut() {
    this.confirmationService.confirm({
      key: 'cikisConfirm',
      message: 'Çıkış Yapmak istediğinizden Emin misiniz?',
      accept: () => {

        this.authenticationService.logout(this.currentUser)
          .subscribe();

        localStorage.removeItem('currentUser');
        localStorage.clear();
        this.router.navigate(['login', 'logout']);
      },
      reject: () => {
        this.router.navigate(['ozet']);
      }
    });
  }

}
