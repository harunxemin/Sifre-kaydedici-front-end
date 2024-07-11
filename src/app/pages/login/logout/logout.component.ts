import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription, timer } from 'rxjs';

import { GlobalVars } from 'app/globalVars';

@Component({
  selector: 'logout',
  templateUrl: 'logout.component.html',
  styleUrl: '../login.scss'
})

export class LogoutComponent {
  sayac = 10;
  bgLoginImageVariable = GlobalVars.getLoginBackgroundImageURL; // + '&TemaNo=' + GlobalFunctions.temaGunNoVer().toString();
  cikisMesaj = 'Sistemden Çıkış Yaptınız.';
  private countDown: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private titleService: Title
  ) {
    this.titleService.setTitle(GlobalVars.programAdi + ' - Sistemden Çıkış');
    // this.userService.currentUser.unsubscribe();
    const cikisNedeni = this.route.snapshot.paramMap.get('neden');
    if (cikisNedeni) {
      if (cikisNedeni === 'oturum') {
        this.cikisMesaj = 'Oturumunuz sonlanmıştır'
      }
    }
    this.countDown = timer(0, 1000)
      .subscribe({
        next: () => {
          this.sayac--;
          if (this.sayac < 1) {
            this.redirect();
          }
        }
      });

  }

  redirect() {
    this.countDown.unsubscribe();
    this.router.navigate(['login', 'login']);
  }

}
