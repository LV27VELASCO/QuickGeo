import { Component} from '@angular/core';
import { Country } from '../../../Interface/models';
import { SelectCountryComponent } from '../select-country/select-country.component';
import { UtilitiesService } from '../../services/utilities.service';
import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { LANGUAGES_OBJECT } from '../../config/languajes';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [SelectCountryComponent,TranslateModule],
  templateUrl: './hero.component.html'
})
export class HeroComponent {
  _countries: Country[] = [];
  _urlFlagBase: string = '';
  _flag: string = '';
  _codePhone: string = '';

  constructor(private utils: UtilitiesService, private route:ActivatedRoute) {}

  ngOnInit(): void {
    this.utils.removeItemStore("data");
    this.route.paramMap.subscribe(params => {
              const lang = params.get('lang') || 'es';
              const index =  LANGUAGES_OBJECT.id.indexOf(lang);
              this._flag = LANGUAGES_OBJECT.flag[index];;
              this._codePhone = LANGUAGES_OBJECT.code[index];
    });
    this.utils.countries$.subscribe((countries) => (this._countries = countries));
    this.utils.urlFlagBase$.subscribe((url) => (this._urlFlagBase = url));
  }

}
