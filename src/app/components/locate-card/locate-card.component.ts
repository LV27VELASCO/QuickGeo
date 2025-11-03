import { Component} from '@angular/core';
import { SelectCountryComponent } from '../select-country/select-country.component';
import { Country } from '../../../Interface/models';
import { UtilitiesService } from '../../services/utilities.service';
import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { LANGUAGES_OBJECT } from '../../config/languajes';

@Component({
  selector: 'app-locate-card',
  standalone: true,
  imports: [SelectCountryComponent,TranslateModule],
  templateUrl: './locate-card.component.html'
})
export class LocateCardComponent {

   constructor(private utils: UtilitiesService, private route:ActivatedRoute) {}

    _countries: Country[] = [];
    _urlFlagBase: string = '';
    _flag: string = '';
    _codePhone: string = '';

    ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
                const lang = params.get('lang') || 'es';
                const index =  LANGUAGES_OBJECT.id.indexOf(lang)
                this._codePhone = LANGUAGES_OBJECT.code[index];
                this._flag = LANGUAGES_OBJECT.flag[index];;
            });
      this.utils.countries$.subscribe((countries) => (this._countries = countries));
      this.utils.urlFlagBase$.subscribe((url) => (this._urlFlagBase = url));
    }

}
