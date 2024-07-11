import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, Inject, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { ThemeService } from '../services/theme.service';
import { themes } from '../theme.constants';

@Directive({
  selector: '[appTheme]'
})

export class ThemeDirective implements OnInit, OnDestroy {
  private themeName = 'tema_1';
  private themServiceSubscription: Subscription;

  constructor(
    private elementRef: ElementRef,
    @Inject(DOCUMENT) private document: Document,
    private themService: ThemeService
  ) { }

  ngOnInit() {
    this.updateTheme(this.themeName);
    this.themService.getActiveTheme()
      .subscribe({
        next: (themeName) => {
          this.themeName = themeName;
          this.updateTheme(this.themeName);
        }
      });
  }

  updateTheme(themeName: string) {
    const element = this.elementRef.nativeElement;
    const theme = themes[themeName];
    for (const key in theme) {
      element.style.setProperty(key, theme[key]);
      this.document.body.style.setProperty(key, theme[key]);
    }
  }

  ngOnDestroy() {
    if (this.themServiceSubscription) {
      this.themServiceSubscription.unsubscribe();
    }
  }

}
