import { Component } from '@angular/core';
import { UtilitiesService } from '../../services/utilities.service';
import { Country } from '../../../Interface/Country';
import {FormsModule} from '@angular/forms';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [FormsModule,LazyLoadImageModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {

  constructor(private utils: UtilitiesService) {
  }

  _countries: Country[] = [];
  _countriesFilter: Country[] = [];
  urlFlagBase="https://flagcdn.com/";

  flag:string="co";
  codePhone:string="+57";
  select:boolean = false;
  searchCountry: string = '';

  ngOnInit() {
    this.utils.getCountries().subscribe((data) => {
      this._countries = data.sort((a:any)=> a.name);
    });
  }

  selectShow(){
    this.select = !this.select
  }


  filterItems(): void {
    this._countriesFilter = this._countries.filter(item =>
      item.name.toLowerCase().includes(this.searchCountry.toLowerCase())
    );
  }

  elementSelect(codePhoneSelect:string,flagSelect:string){
    this.codePhone = codePhoneSelect;
    this.flag = flagSelect;
    this.select = false;
  }

 
}
