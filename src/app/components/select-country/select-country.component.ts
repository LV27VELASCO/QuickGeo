import { Component, Input } from '@angular/core';
import { Country } from '../../../Interface/Country';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-select-country',
  standalone: true,
  imports: [FormsModule,LazyLoadImageModule],
  templateUrl: './select-country.component.html'
})
export class SelectCountryComponent {

    @Input() _countries: Country[] = [];
    @Input() _urlFlagBase: string = '';
    @Input() _flag: string = '';
    @Input() _codePhone: string = '';
    countriesFilter: Country[] = [];
    select:boolean = false;
    buttonLocation:boolean = true;
    searchCountry: string = '';
  
    selectShow(){
      this.select = !this.select;
      this.searchCountry ='';
    }
  
    filterItems(): void {
      this.countriesFilter = this._countries.filter(item =>
        item.name.toLowerCase().includes(this.searchCountry.toLowerCase())
      );
    }
  
    elementSelect(codePhoneSelect:string,flagSelect:string){
      this._codePhone = codePhoneSelect;
      this._flag = flagSelect;
      this.select = false;
    }

    clickLocation(){
      this.buttonLocation = false;
    }

}
