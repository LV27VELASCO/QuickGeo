import { Component, Input} from '@angular/core';
import { Country } from '../../../Interface/Country';
import { SelectCountryComponent } from '../select-country/select-country.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [SelectCountryComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {
  @Input() _countries: Country[] = [];
  @Input() _urlFlagBase: string = '';
  @Input() _flag: string = '';
  @Input() _codePhone: string = '';
}
