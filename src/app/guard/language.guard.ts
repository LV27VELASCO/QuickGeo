import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';

export const ALLOWED_LANGUAGES = ['es', 'en', 'fr'];
export const DEFAULT_LANG = 'es';

@Injectable({ providedIn: 'root' })
export class LanguageGuard implements CanActivate {

  constructor(
    private translate: TranslateService,
    private router: Router,
    private meta: Meta,
    private title: Title,
    @Inject(DOCUMENT) private document: Document
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const lang = route.params['lang'];

    // Si el idioma no está permitido, redirige al idioma por defecto
    if (!ALLOWED_LANGUAGES.includes(lang)) {
      this.router.navigate([`/${DEFAULT_LANG}`]);
      return false;
    }

    const descriptions: Record<string, string> = {
      es: 'Encuentra tu móvil fácilmente con QuickGeo. Localiza tu teléfono en segundos.',
      en: 'Find your phone easily with QuickGeo. Locate any device in seconds.',
      fr: 'Trouvez votre téléphone facilement avec QuickGeo. Localisez votre mobile en quelques secondes.'
    };

    const titles: Record<string, string> = {
      es: 'QuickGeo - Localiza tu teléfono en segundos',
      en: 'QuickGeo - Find Your Phone Fast',
      fr: 'QuickGeo - Localisez votre téléphone rapidement'
    };

    // Actualiza <title>
    this.title.setTitle(titles[lang] || titles[DEFAULT_LANG]);

    // Actualiza o crea la meta descripción
    this.meta.updateTag({
      name: 'description',
      content: descriptions[lang] || descriptions[DEFAULT_LANG]
    });


    // Configura el idioma actual en ngx-translate
    this.translate.use(lang);
    this.document.documentElement.lang = lang;
    return true;
  }
}
