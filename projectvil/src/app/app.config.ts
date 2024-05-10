import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {BrowserModule, provideClientHydration} from "@angular/platform-browser";
import {HttpClient, provideHttpClient, withInterceptors} from "@angular/common/http";
import {BrowserAnimationsModule, provideAnimations} from "@angular/platform-browser/animations";
import {errorInterceptor} from "./core/interceptors/error.interceptor";
import {languageInterceptor} from "./core/interceptors/language.interceptor";
import {provideToastr} from "ngx-toastr";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {DefaultLanguage} from "./shared/constants/service.url.constants";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {authInterceptor} from "./core/interceptors/auth.interceptor";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json')
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withInterceptors([errorInterceptor, languageInterceptor, authInterceptor])),
    provideAnimations(),
    provideToastr(),
    BrowserModule,
    BrowserAnimationsModule,
    provideToastr({
      timeOut: 4000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    importProvidersFrom(
      TranslateModule.forRoot({
        defaultLanguage: DefaultLanguage,
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      }),
    ), provideAnimationsAsync()
  ]
};
