import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })

export class BaThemeSpinnerService {
  private _selector = 'preloader';
  private _element: HTMLElement;

  constructor() {
    this._element = document.getElementById(this._selector);
  }

  show(): void {
    this._element.style['display'] = 'block';
  }

  hide(delay = 0): void {
    setTimeout(() => {
      this._element.style['display'] = 'none';
    }, delay);
  }
}
