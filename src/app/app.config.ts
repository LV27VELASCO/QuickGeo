import { ApplicationConfig, importProvidersFrom, PLATFORM_ID, provideZoneChangeDetection } from '@angular/core';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { provideClientHydration } from '@angular/platform-browser';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { isPlatformBrowser } from '@angular/common';
import { APP_INITIALIZER } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { routes } from './app.routes';
import { ALLOWED_LANGUAGES } from './config/languajes';

export function HttpLoaderFactory(http: HttpClient):TranslateHttpLoader{
  return new TranslateHttpLoader(http, './assets/jsons/i18n/', '.json');
}

export function appInitializerFactory(translate: TranslateService , platformId: Object) {
  return () => {
      if (isPlatformBrowser(platformId)) {
        let lang = localStorage.getItem('lang'); // Idioma por defecto
        if(lang && ALLOWED_LANGUAGES.includes(lang)){
          translate.setDefaultLang(lang);
        }else{
          translate.use("es");  
        }
    };
  }
}

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), 
    importProvidersFrom(
      TranslateModule.forRoot({ loader: { provide: TranslateLoader, useFactory: HttpLoaderFactory, deps: [HttpClient]},defaultLanguage:'es'})
    ),
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      deps: [TranslateService,PLATFORM_ID],
      multi: true,
    },
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(routes), provideClientHydration(), provideHttpClient()]
};
