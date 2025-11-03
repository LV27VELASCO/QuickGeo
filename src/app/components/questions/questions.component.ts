import { Component, inject, Input } from '@angular/core';
import { RouterLink} from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { UtilitiesService } from '../../services/utilities.service';

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [RouterLink,TranslateModule],
  templateUrl: './questions.component.html'
})
export class QuestionsComponent {
  @Input() _ishome: boolean = true;

  acordions:boolean[]=[false,false,false,false,false,false,false,false];
  utils = inject(UtilitiesService);

  setAccordeon(index:number){
    this.acordions[index]=!this.acordions[index];
  }

  navegar(ruta: string): void {
    // Llamamos a UtilsService para navegar
    this.utils.navigate(ruta)
      .then(() => {
        // Scroll suave al inicio
        window.scrollTo({ top: 0, behavior: 'smooth' });
      })
      .catch(err => console.error('Navigation error:', err));
  }

}
