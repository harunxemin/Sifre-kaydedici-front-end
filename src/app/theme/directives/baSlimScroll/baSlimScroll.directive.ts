import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

import 'jquery-slimscroll';

@Directive({
  selector: '[baSlimScroll]'
})

export class BaSlimScrollDirective implements OnChanges {
  @Input() baSlimScrollOptions: object;

  constructor(private _elementRef: ElementRef) {
  }

  ngOnChanges() {
    this._scroll();
  }

  private _scroll() {
    this._destroy();
    this._init();
  }

  private _init() {
    jQuery(this._elementRef.nativeElement).slimScroll(this.baSlimScrollOptions);
  }

  private _destroy() {
    jQuery(this._elementRef.nativeElement).slimScroll({ destroy: true });
  }
}
