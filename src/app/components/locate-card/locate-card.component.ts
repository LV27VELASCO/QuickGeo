import { Component} from '@angular/core';
import { SelectCountryComponent } from '../select-country/select-country.component';
import { Country } from '../../../Interface/models';
import { UtilitiesService } from '../../services/utilities.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-locate-card',
  standalone: true,
  imports: [SelectCountryComponent,TranslateModule],
  templateUrl: './locate-card.component.html'
})
export class LocateCardComponent {

   constructor(private utils: UtilitiesService) {}

    _countries: Country[] = [];
    _urlFlagBase: string = '';
    _flag: string = '';
    _codePhone: string = '';

    ngOnInit(): void {
      this.utils.countries$.subscribe((countries) => (this._countries = countries));
      this.utils.urlFlagBase$.subscribe((url) => (this._urlFlagBase = url));
      this.utils.flag$.subscribe((flag) => (this._flag = flag));
      this.utils.codePhone$.subscribe((code) => (this._codePhone = code));
    }

}
