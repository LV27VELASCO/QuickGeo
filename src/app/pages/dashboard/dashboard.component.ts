import { Detail } from '../../../Interface/models';
import { ApiService } from '../../services/api.service';
import { UtilitiesService } from '../../services/utilities.service';
import { Component, inject} from '@angular/core';
import { Country, SendSms } from '../../../Interface/models';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LANGUAGES_OBJECT } from '../../config/languajes';
import { LanguageComponent } from '../../components/language/language.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [LazyLoadImageModule,TranslateModule,ReactiveFormsModule,FormsModule,LanguageComponent],
  templateUrl: './dashboard.component.html',
  styleUrl:'./dashboard.component.css'
})
export class DashboardComponent {

  hover:boolean=false;
  load:boolean=false;
  locationHistory:Detail[] | undefined;
  listUniqueValues:string[]=[];

  fb = inject(FormBuilder);
  utils = inject(UtilitiesService);
  api = inject(ApiService);
  _countries: Country[] = [];
  _urlFlagBase: string = '';
  _flag: string = '';
  _codePhone: string = '';
  _credits:number=0;
  formPhone:FormGroup=this.fb.group({
   numberPhone:['', [Validators.required, Validators.pattern('^[0-9]{1,11}$')]],
   codePhone:[''],
   codeCountry:[''],
   textarea:''
  })
  countriesFilter: Country[] = [];
  select:boolean = false;
  selectLanguage:boolean = false;
  nombreLang="Español";
  buttonLocation:boolean = true;
  searchCountry: string = '';
  orderByDateAsc: boolean = true;
  message="";

  ngOnInit(): void {
    this.utils.countries$.subscribe((countries) => (this._countries = countries));
    this.utils.urlFlagBase$.subscribe((url) => (this._urlFlagBase = url));
    this.utils.flag$.subscribe((flag) => (this._flag = flag));
    this.utils.codePhone$.subscribe((code) => (this._codePhone = code));
    this.formPhone.get("codePhone")?.setValue(this._codePhone);
    this.formPhone.get("codeCountry")?.setValue(this._flag);
    const lang = this.utils.getItem('lang');
    const LANGUAGE = LANGUAGES_OBJECT.id.includes(lang)?lang:LANGUAGES_OBJECT.id[0];

    const token = this.utils.getCookie('access_token');
    if (token) {
      this.getHistoryLocations();
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
    this.formPhone.get("codeCountry")?.setValue(this._flag);
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
    if(this.formPhone.valid){
      this.buttonLocation = false;
      const reqData: SendSms = {
        code:this.formPhone.get("codePhone")?.value ,
        phone_number: this.formPhone.get("numberPhone")?.value,
        code_country:this.formPhone.get("codeCountry")?.value,
        message:this.formPhone.get("textarea")?.value?this.formPhone.get("textarea")?.value:" ",
        credits:this._credits
      };

      this.api.SendSms(reqData).subscribe({
        next: (data) => {
          this.formPhone.get("numberPhone")?.reset()
          this.formPhone.get("textarea")?.reset()
          this.formPhone.controls['numberPhone'].setErrors({'success': true});
          this.getHistoryLocations();
          this.buttonLocation = true;
        },
        error: (err) => {
          this.buttonLocation = true;
        }
      });
    }
  }

  onHover() {
    this.hover = !this.hover
  }

  getHistoryLocations(){
    this.load=true;
    this.api.GetHistoryLocations().subscribe({
      next: (data) => {
        this.load=false;
        this._credits = data.details.credits
        this.locationHistory = data.details.history
      },
      error: (err) => {
        if (err.status === 401) {
          console.error("No autorizado (401). Verifica tu token.");
          this.logOut();
        } else{
          console.error(err);
        }
        this.load=false;
      }
    });
  }

  obtenerFechaFormateada(fechaString: string): string {
    const fecha = new Date(fechaString);
    const dia = String(fecha.getUTCDate()).padStart(2, '0');
    const mes = String(fecha.getUTCMonth() + 1).padStart(2, '0');
    const anio = String(fecha.getUTCFullYear()).slice(-2);
    return `${dia}/${mes}/${anio}`;
  }

 obtenerHoraFormateada(fechaString: string): string {
    const fecha = new Date(fechaString);
    const horas = String(fecha.getUTCHours()).padStart(2, '0');
    const minutos = String(fecha.getUTCMinutes()).padStart(2, '0');
    const segundos = String(fecha.getUTCSeconds()).padStart(2, '0');
    return `${horas}:${minutos}:${segundos}`;
  }

  openGoogleMaps(latitude: number, longitude: number) {
    const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
    window.open(url, '_blank');
  }

  logOut(){
    this.utils.removeCookie('access_token')
    this.utils.navigate('login')
  }

  sortByDate() {
    this.locationHistory?.sort((a, b) => {
      const comparison = new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      return this.orderByDateAsc ? comparison : -comparison;
    });

    // Cambiar el estado para la próxima vez
    this.orderByDateAsc = !this.orderByDateAsc;
  }

}
