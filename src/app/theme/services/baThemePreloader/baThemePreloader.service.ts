import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })

export class BaThemePreloaderService {
  private static _loaders: Promise<any>[] = [];

  static registerLoader(method: Promise<any>): void {
    BaThemePreloaderService._loaders.push(method);
  }

  static clear(): void {
    BaThemePreloaderService._loaders = [];
  }

  static load(): Promise<any> {
    return new Promise((resolve) => {
      BaThemePreloaderService._executeAll(resolve);
    });
  }

  private static _executeAll(done: Function): void {
    setTimeout(() => {
      Promise.all(BaThemePreloaderService._loaders).then((values) => {
        done.call(null, values);

      }).catch((error) => {
        console.error(error);
      });
    });
  }
}
