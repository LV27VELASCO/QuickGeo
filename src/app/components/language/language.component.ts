import { Component } from '@angular/core';
import { UtilitiesService } from '../../services/utilities.service';
import { LANGUAGES_OBJECT } from '../../config/languajes';

@Component({
  selector: 'app-language',
  standalone: true,
  imports: [],
  templateUrl: './language.component.html'
})
export class LanguageComponent {

  constructor(private Utils:UtilitiesService){ }
    selectLang:boolean = false;
    nombreLang="Español";

   ngOnInit() {
      const lang = this.Utils.getItem('lang');
      if(lang){
        const index= LANGUAGES_OBJECT.id.includes(lang)?LANGUAGES_OBJECT.id.indexOf(lang):0;
        console.log(index);
        this.nombreLang = LANGUAGES_OBJECT.nombre[index];
      }
    }

    selectShow(){
      this.selectLang = !this.selectLang;
    }

    cambioIdioma(idioma:string, index:number){
      this.selectLang = false;
      this.nombreLang =LANGUAGES_OBJECT.nombre[index]
      this.Utils.translateText(idioma);
    }
}
