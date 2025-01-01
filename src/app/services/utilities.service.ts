import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Country } from '../../Interface/Country';

 @Injectable({
   providedIn: 'root'
 })
 export class UtilitiesService {

  constructor(private http: HttpClient) {
    // This service can now make HTTP requests via `this.http`.
  }

  private countriesSource = new BehaviorSubject<Country[]>([]);
  private urlFlagBaseSource = new BehaviorSubject<string>('https://flagcdn.com/');
  private flagSource = new BehaviorSubject<string>('co');
  private codePhoneSource = new BehaviorSubject<string>('+57');
  private jsonUrl = 'country.json'; // Ruta al archivo JSON local

  countries$ = this.countriesSource.asObservable();
  urlFlagBase$ = this.urlFlagBaseSource.asObservable();
  flag$ = this.flagSource.asObservable();
  codePhone$ = this.codePhoneSource.asObservable();

  setCountries(countries: Country[]) {
    this.countriesSource.next(countries);
  }

  setUrlFlagBase(urlFlagBase: string) {
    this.urlFlagBaseSource.next(urlFlagBase);
  }

  setFlag(flag: string) {
    this.flagSource.next(flag);
  }

  setCodePhone(codePhone: string) {
    this.codePhoneSource.next(codePhone);
  }

   getCountries(): Observable<any> {
     return this.http.get<any>(this.jsonUrl);
   }

}
