import { Component } from '@angular/core';

import { GlobalState } from 'app/global.state';

@Component({
  selector: 'ba-content-top',
  templateUrl: 'baContentTop.component.html',
  styleUrl: 'baContentTop.component.scss'
})

export class BaContentTopComponent {
  activePageTitle = '';

  constructor(private _state: GlobalState) {
    this._state.subscribe('menu.activeLink', (activeLink) => {
      if (activeLink) {
        this.activePageTitle = activeLink.title;
      }
    });
  }
}
