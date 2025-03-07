import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Country } from '../../Interface/models';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

 @Injectable({
   providedIn: 'root'
 })
 export class UtilitiesService {

  constructor(
    private http: HttpClient,
    private translate:TranslateService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object) { }

  private countriesSource = new BehaviorSubject<Country[]>([]);
  private urlFlagBaseSource = new BehaviorSubject<string>('https://flagcdn.com/');
  private flagSource = new BehaviorSubject<string>('co');
  private codePhoneSource = new BehaviorSubject<string>('+57');
  private jsonUrl = 'assets/jsons/country.json'; // Ruta al archivo JSON local

  countries$ = this.countriesSource.asObservable();
  urlFlagBase$ = this.urlFlagBaseSource.asObservable();
  flag$ = this.flagSource.asObservable();
  codePhone$ = this.codePhoneSource.asObservable();

  obtenerFechaFormateada(): string {
    const fecha = new Date();
    const dia = this.padNumber(fecha.getDate());
    const mes = this.padNumber(fecha.getMonth() + 1); // Los meses empiezan en 0
    const anio = fecha.getFullYear();
    const horas = this.padNumber(fecha.getHours());
    const minutos = this.padNumber(fecha.getMinutes());

    return `${dia}/${mes}/${anio} at ${horas}:${minutos}`;
  }

  padNumber(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }

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

   translateText(lang:string){
    this.translate.use(lang)
    this.setItemLocal('lang',lang)
   }

  getItem(item:string):any{
     if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(item)
     }
  }

  setItemLocal(name:string, value:any){
    localStorage.setItem(name,value);
  }

  clearLocalStorage(){
    localStorage.clear();
  }

  navigate(ruta:string){
    this.router.navigate([ruta])
  }

  isNullOrEmpty(value: string | null | undefined): boolean {
    return !value || value.trim() === '';
  }



}
