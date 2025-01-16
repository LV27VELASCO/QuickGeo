import { Component, inject} from '@angular/core';
import { Country, PhoneInfo } from '../../../Interface/models';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { UtilitiesService } from '../../services/utilities.service';
import { TranslateModule } from '@ngx-translate/core';
import { ApiService } from '../../services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LANGUAGES_OBJECT } from '../../config/languajes';

@Component({
  selector: 'app-select-country',
  standalone: true,
  imports: [LazyLoadImageModule,TranslateModule,ReactiveFormsModule,FormsModule],
  templateUrl: './select-country.component.html'
})
export class SelectCountryComponent {

   fb = inject(FormBuilder);
   utils = inject(UtilitiesService);
   api = inject(ApiService);
   _countries: Country[] = [];
   _urlFlagBase: string = '';
   _flag: string = '';
   _codePhone: string = '';

   formPhone:FormGroup=this.fb.group({
    numberPhone:['', [Validators.required, Validators.pattern('^[0-9]{1,11}$')]],
    codePhone:[''],
    codeLang:['']
   })

    countriesFilter: Country[] = [];
    select:boolean = false;
    buttonLocation:boolean = true;
    searchCountry: string = '';
    
      ngOnInit(): void {
        this.utils.countries$.subscribe((countries) => (this._countries = countries));
        this.utils.urlFlagBase$.subscribe((url) => (this._urlFlagBase = url));
        this.utils.flag$.subscribe((flag) => (this._flag = flag));
        this.utils.codePhone$.subscribe((code) => (this._codePhone = code));
        this.formPhone.get("codePhone")?.setValue(this._codePhone);
        const lang = this.utils.getItem('lang');
        if(lang !=null && LANGUAGES_OBJECT.id.includes(lang)){
            const index =  LANGUAGES_OBJECT.id.indexOf(lang);
            this.formPhone.get("codeLang")?.setValue(LANGUAGES_OBJECT.id[index]);
        }else{
            this.formPhone.get("codeLang")?.setValue(LANGUAGES_OBJECT.id[0]);
        }
        
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
      this.formPhone.get("codePhone")?.setValue(this._codePhone);
    }

    removeNonDigits(event: any) {
      let inputValue = event.target.value;
      inputValue = inputValue.replace(/\D/g, ''); // Reemplaza todos los caracteres no numéricos por vacío
      if (inputValue.length > 11) {
        inputValue = inputValue.slice(0, 12); // Solo permite los primeros 11 dígitos
      }
      event.target.value = inputValue;
      this.formPhone.patchValue({ phoneNumber: inputValue });
    }

    onSubmit(){
      console.log("ok si")
      if(this.formPhone.valid){
        console.log("ok si")
        this.buttonLocation = false;
        const reqData: PhoneInfo = {code:this.formPhone.get("codePhone")?.value ,phone_number: this.formPhone.get("numberPhone")?.value, code_lang:`${this.formPhone.get("codeLang")?.value}`};
        this.api.GetOperador(reqData).subscribe({
          next: (data) => {
            if(!this.utils.isNullOrEmpty(data.operator)){
              data.flag = this._flag;
              data.phoneText = `${reqData.code} ${reqData.phone_number}`;
              data.date = this.utils.obtenerFechaFormateada();
              this.formPhone.reset();
              this.utils.setItemLocal("data",JSON.stringify(data));
              this.utils.navigate("loading");
            }else{
              this.formPhone.controls['numberPhone'].setErrors({'incorrect': true});
            }
            this.buttonLocation = true;
          },
          error: (err) => {
            this.formPhone.reset();
            this.formPhone.controls['numberPhone'].setErrors({'fail': true})
            this.buttonLocation = true;
          }
        });
      }
    }
}
