import { Component } from '@angular/core';
import { LANGUAGES_OBJECT } from '../../config/languajes';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-language',
  standalone: true,
  imports: [],
  templateUrl: './language.component.html'
})
export class LanguageComponent {

  selectLang = false;
  nombreLang = 'Español';
  langActual = 'es';

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Detecta idioma actual desde la URL
    this.route.paramMap.subscribe(params => {
      const lang = params.get('lang') || 'es';
      this.langActual = lang;
      const index = LANGUAGES_OBJECT.id.indexOf(lang);
      this.nombreLang = index >= 0 ? LANGUAGES_OBJECT.nombre[index] : 'Español';
    });
  }

  selectShow() {
    this.selectLang = !this.selectLang;
  }

  cambioIdioma(idioma: string, index: number) {
    this.selectLang = false;
    this.nombreLang = LANGUAGES_OBJECT.nombre[index];

    // Obtiene la URL actual y reemplaza el idioma
    const currentUrl = this.router.url;

    // Detecta el idioma actual en la ruta (ej: /es/contact → es)
    const firstSegment = currentUrl.split('/')[1];

    // Reemplaza el idioma actual por el nuevo
    const newUrl = currentUrl.replace(`/${firstSegment}`, `/${idioma}`);

    // Navega sin recargar la página
    this.router.navigateByUrl(newUrl);
  }
}
