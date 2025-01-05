import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink} from '@angular/router';
import { UtilitiesService } from '../../services/utilities.service';
import { LANGUAGES_OBJECT } from '../../config/languajes';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink,TranslateModule],
  templateUrl: './footer.component.html'
})
export class FooterComponent {

  constructor(private Utils:UtilitiesService){ }
  select:boolean = false;
  nombreLang="Español";

  ngOnInit() {
    const lang = this.Utils.getItem('lang');
    if(lang !=null && LANGUAGES_OBJECT.id.includes(lang)){
      const index =  LANGUAGES_OBJECT.id.indexOf(lang);
      this.nombreLang = LANGUAGES_OBJECT.nombre[index];
    }else{
      this.nombreLang = LANGUAGES_OBJECT.nombre[0]
    }
  }

  selectShow(){
    this.select = !this.select;
  }

  cambioIdioma(idioma:string, index:number){
    this.select = false;
    this.nombreLang =LANGUAGES_OBJECT.nombre[index]
    this.Utils.translateText(idioma);
  }

  navegar(ruta:string){
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.Utils.navigate(ruta)
  }

}
