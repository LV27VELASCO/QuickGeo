import { Component, Input} from '@angular/core';
import { Country } from '../../../Interface/Country';
import { SelectCountryComponent } from '../select-country/select-country.component';
import { UtilitiesService } from '../../services/utilities.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [SelectCountryComponent],
  templateUrl: './hero.component.html'
})
export class HeroComponent {
  _countries: Country[] = [];
  _urlFlagBase: string = '';
  _flag: string = '';
  _codePhone: string = '';

  constructor(private utils: UtilitiesService) {}

  ngOnInit(): void {
    this.utils.countries$.subscribe((countries) => (this._countries = countries));
    this.utils.urlFlagBase$.subscribe((url) => (this._urlFlagBase = url));
    this.utils.flag$.subscribe((flag) => (this._flag = flag));
    this.utils.codePhone$.subscribe((code) => (this._codePhone = code));
  }
  
}
