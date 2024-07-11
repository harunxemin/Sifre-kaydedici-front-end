import { AfterViewInit, Component, ElementRef, input, numberAttribute, viewChild } from '@angular/core';

@Component({
  selector: 'ba-back-top',
  templateUrl: 'baBackTop.component.html',
  styleUrl: 'baBackTop.component.scss',
  host: {
    '(click)': '_onClick()',
    '(window:scroll)': '_onWindowScroll()'
  }
})

export class BaBackTopComponent implements AfterViewInit {
  position = input.required<number, string>({ transform: numberAttribute });
  showSpeed = input(500, { transform: numberAttribute });
  moveSpeed = input(1000, { transform: numberAttribute });

  _selector = viewChild<ElementRef<HTMLElement>>('baBackTop');

  ngAfterViewInit() {
    this._onWindowScroll();
  }

  _onClick(): boolean {
    jQuery('html, body').animate({ scrollTop: 0 }, { duration: this.moveSpeed() });
    return false;
  }

  _onWindowScroll(): void {
    const el = this._selector().nativeElement;
    window.scrollY > this.position() ? jQuery(el).fadeIn(this.showSpeed()) : jQuery(el).fadeOut(this.showSpeed());
  }
}
