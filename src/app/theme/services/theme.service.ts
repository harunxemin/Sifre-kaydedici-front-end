import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { GlobalVars } from 'app/globalVars';
import { themes } from '../theme.constants';

@Injectable({ providedIn: 'root' })

export class ThemeService {
  private activeThem = new BehaviorSubject('tema_1');

  getActiveTheme() {
    return this.activeThem.asObservable();
  }

  setActiveThem(themeName) {
    this.activeThem.next(themeName);
    GlobalVars.primaryColor = themes[themeName]['--primary'];
    GlobalVars.logoColor = themes[themeName]['--logo'];
    GlobalVars.aktifTema = themes[themeName]['--temaNo'];
    GlobalVars.menuSelectedColor = themes[themeName]['--menuSelected'];
  }
}
