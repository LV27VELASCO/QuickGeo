import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

export const ALLOWED_LANGUAGES = ['es', 'en', 'fr'];
export const DEFAULT_LANG = 'es';

@Injectable({ providedIn: 'root' })
export class LanguageGuard implements CanActivate {

  constructor(
    private translate: TranslateService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const lang = route.params['lang'];

    // Si el idioma no está permitido, redirige al idioma por defecto
    if (!ALLOWED_LANGUAGES.includes(lang)) {
      this.router.navigate([`/${DEFAULT_LANG}`]);
      return false;
    }

    // Configura el idioma actual en ngx-translate
    this.translate.use(lang);

    return true;
  }
}
