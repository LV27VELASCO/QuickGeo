import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, RouterOutlet} from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { UtilitiesService } from '../../services/utilities.service';
import { LANGUAGES_OBJECT } from '../../config/languajes';

@Component({
  selector: 'app-header',
  standalone: true,
  imports:[RouterOutlet,RouterModule,TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        animate(
          '600ms ease-in-out',
          keyframes([
            style({ transform: 'scale(1.1)', filter: 'blur(3px)', opacity: 0, offset: 0 }),
            style({ transform: 'scale(1)', filter: 'blur(0)', opacity: 1, offset: 1 }),
          ])
        ),
      ]),
    ]),
  ],
})
export class HeaderHomeComponent {
  menu:boolean = false;
  nombreLang = 'Español';
  langActual: string = 'es';

  constructor(private Utils:UtilitiesService, private router: Router, private route: ActivatedRoute){ }

  ngOnInit() {
        // Detecta idioma actual desde la URL
        this.route.paramMap.subscribe(params => {
          const lang = params.get('lang') || 'es';
          this.langActual = lang;
          const index = LANGUAGES_OBJECT.id.indexOf(lang);
          this.nombreLang = index >= 0 ? LANGUAGES_OBJECT.nombre[index] : 'Español';
        });
  }

  menuActivate(){
    this.menu = !this.menu
  }

  navegar(ruta: string): void {
    // Cierra el menú si está abierto
    if (this.menu) this.menu = false;

    // Llamamos a UtilsService para navegar
    this.Utils.navigate(ruta)
      .then(() => {
        // Scroll suave al inicio
        window.scrollTo({ top: 0, behavior: 'smooth' });
      })
      .catch(err => console.error('Navigation error:', err));
  }

}
