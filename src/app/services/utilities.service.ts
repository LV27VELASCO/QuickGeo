import { inject, Injectable } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

 @Injectable({
   providedIn: 'root'
 })
 export class UtilitiesService {
   private jsonUrl = 'country.json'; // Ruta al archivo JSON local

   constructor(private http: HttpClient) {
    // This service can now make HTTP requests via `this.http`.
  }


   getCountries(): Observable<any> {
     return this.http.get<any>(this.jsonUrl);
   }

}
