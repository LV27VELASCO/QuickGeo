import { Component} from '@angular/core';
import { Country } from '../../../Interface/Country';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import {FormsModule} from '@angular/forms';
import { UtilitiesService } from '../../services/utilities.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-select-country',
  standalone: true,
  imports: [FormsModule,LazyLoadImageModule,TranslateModule],
  templateUrl: './select-country.component.html'
})
export class SelectCountryComponent {

  constructor(private utils: UtilitiesService) {}

    _countries: Country[] = [];
    _urlFlagBase: string = '';
    _flag: string = '';
    _codePhone: string = '';
    countriesFilter: Country[] = [];
    select:boolean = false;
    buttonLocation:boolean = true;
    searchCountry: string = '';

    
    
      ngOnInit(): void {
        this.utils.countries$.subscribe((countries) => (this._countries = countries));
        this.utils.urlFlagBase$.subscribe((url) => (this._urlFlagBase = url));
        this.utils.flag$.subscribe((flag) => (this._flag = flag));
        this.utils.codePhone$.subscribe((code) => (this._codePhone = code));
      }
  
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
