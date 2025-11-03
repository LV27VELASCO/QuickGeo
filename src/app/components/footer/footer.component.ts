import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink} from '@angular/router';
import { UtilitiesService } from '../../services/utilities.service';
import { LANGUAGES_OBJECT } from '../../config/languajes';
import { Console } from 'console';
import { LanguageComponent } from '../language/language.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [TranslateModule,RouterLink,LanguageComponent],
  templateUrl: './footer.component.html'
})
export class FooterComponent {

  constructor(private Utils:UtilitiesService){ }

   navegar(ruta: string): void {

    // Llamamos a UtilsService para navegar
    this.Utils.navigate(ruta)
      .then(() => {
        // Scroll suave al inicio
        window.scrollTo({ top: 0, behavior: 'smooth' });
      })
      .catch(err => console.error('Navigation error:', err));
  }

}
