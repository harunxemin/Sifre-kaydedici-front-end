import { registerLocaleData } from '@angular/common';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import localeEN from '@angular/common/locales/en';
import localeTr from '@angular/common/locales/tr';
import { ApplicationRef, LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

import { LocaleService } from 'services/locale.service';
import { SpinnerComponent } from 'shared/spinner/spinner.component';
import { AppRoutingModule } from './app-routing';
import { AppComponent } from './app.component';
import { AppState, IInternalStateType } from './app.service';
import { PagesModule } from './pages/pages.module';
import { NgaModule } from './theme/nga.module';

export interface IStoreType {
  state: IInternalStateType;
  restoreInputValues: () => void;
  disposeOldHosts: () => void;
}

registerLocaleData(localeTr);
registerLocaleData(localeEN);

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent
  ],
  bootstrap: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    ModalModule.forRoot(),
    NgaModule.forRoot(),
    PagesModule,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    ConfirmationService,
    MessageService,
    DialogService,
    Title,
    {
      provide: LOCALE_ID,
      useValue: 'tr-TR',
      deps: [LocaleService],
      useFactory: (LS: {
        locale: string;
      }) => LS.locale
    },
    LocaleService,
    provideHttpClient(withInterceptorsFromDi())
  ]
})

export class AppModule {
  constructor(
    appRef: ApplicationRef,
    appState: AppState
  ) { }

}
