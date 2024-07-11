import { Component } from '@angular/core';

import { GlobalVars } from 'app/globalVars';

@Component({
  selector: 'login-ust',
  templateUrl: 'login-ust.component.html',
  styleUrl: '../login.scss'
})

export class LoginUstComponent {
  programAdi = GlobalVars.programAdi;
  programSurum = GlobalVars.programSurum;

  get getAktifTema() {
    return GlobalVars.aktifTema;
  }
}
