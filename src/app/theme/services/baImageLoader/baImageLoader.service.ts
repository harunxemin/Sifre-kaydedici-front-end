import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })

export class BaImageLoaderService {
  load(src: string): Promise<any> {

    return new Promise((resolve) => {
      const img: HTMLImageElement = new Image();
      img.src = src;
      img.onload = function () {
        resolve('Image with src ' + src + ' loaded successfully.');
      };
    });
  }
}
