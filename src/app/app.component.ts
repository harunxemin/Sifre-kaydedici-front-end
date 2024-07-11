import { AfterViewInit, Component, VERSION } from '@angular/core';
import { Title } from '@angular/platform-browser';

import * as $ from 'jquery';
import { GlobalState } from './global.state';
import { GlobalVars } from './globalVars';
import { BaThemePreloaderService } from './theme/services/baThemePreloader/baThemePreloader.service';
import { BaThemeSpinnerService } from './theme/services/baThemeSpinner/baThemeSpinner.service';
import { ThemeService } from './theme/services/theme.service';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  templateUrl: 'app.component.html',
  styleUrl: 'app.component.scss',
  host: {
    '(document:visibilitychange)': 'visibilitychange()'
  }
})

export class AppComponent implements AfterViewInit {
  activeThem = 'tema_1';
  oldTitle = '';
  test = 'col';
  isMenuCollapsed = false;

  constructor(
    private _spinner: BaThemeSpinnerService,
    private _state: GlobalState,
    private themeService: ThemeService,
    private titleService: Title
  ) {

    this.themeService.setActiveThem(this.activeThem);

    this._state.subscribe('menu.isCollapsed', (isCollapsed: boolean) => {
      this.isMenuCollapsed = isCollapsed;
    });
  }

  visibilitychange() {
    this.checkHiddenDocument();
  }

  checkHiddenDocument() {
    if (document.hidden) {
      this.oldTitle = this.titleService.getTitle();
      this.titleService.setTitle('Hey sen! Geri gel 😎');

    } else {
      this.titleService.setTitle(this.oldTitle);
    }

  }

  get bgImageVariable() {
    // return GlobalVars.getBackgroundImageURL + '&TemaNo=' + GlobalVars.aktifTema.toString();
    return GlobalVars.getBackgroundImageURL;
  }

  ngAfterViewInit(): void {
    // hide spinner once all loaders are completed
    BaThemePreloaderService.load().then((values) => {
      this._spinner.hide();
    });

    console.info('Uygulama başladıldı. Angular Sürümü: ' + VERSION.full + '. Sunucu IP Adresi: ' + GlobalVars.serverURL + '. Sürüm: ' + GlobalVars.programSurum);

  }

}
