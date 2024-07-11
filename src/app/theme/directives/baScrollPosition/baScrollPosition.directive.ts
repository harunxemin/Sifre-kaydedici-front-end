import { Directive, input, numberAttribute, OnInit, output } from '@angular/core';

@Directive({
  selector: '[baScrollPosition]',
  host: {
    '(window:scroll)': 'onWindowScroll()'
  }
})

export class BaScrollPositionDirective implements OnInit {
  maxHeight = input.required<number, string>({ transform: numberAttribute });
  scrollChange = output<boolean>();

  private _isScrolled: boolean;

  ngOnInit(): void {
    this.onWindowScroll();
  }

  onWindowScroll(): void {
    const isScrolled = window.scrollY > this.maxHeight();
    if (isScrolled !== this._isScrolled) {
      this._isScrolled = isScrolled;
      this.scrollChange.emit(isScrolled);
    }
  }
}
