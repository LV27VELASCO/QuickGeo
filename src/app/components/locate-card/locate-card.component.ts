import { Component, Input } from '@angular/core';
import { SelectCountryComponent } from '../select-country/select-country.component';
import { Country } from '../../../Interface/Country';

@Component({
  selector: 'app-locate-card',
  standalone: true,
  imports: [SelectCountryComponent],
  templateUrl: './locate-card.component.html'
})
export class LocateCardComponent {
  @Input() _countries: Country[] = [];  
  @Input() _urlFlagBase: string = '';
  @Input() _flag: string = '';
  @Input() _codePhone: string = '';
}
