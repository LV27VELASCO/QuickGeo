import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { PhoneInfo, resPhoneInfo } from '../../Interface/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}

  private baseUrl = environment.apiUrl;

  GetOperador(data: PhoneInfo): Observable<resPhoneInfo> {
    const url = `${this.baseUrl}/phone-info`; // Construye la URL completa
    return this.http.post<resPhoneInfo>(url, data); // Realiza la solicitud POST
  }

}
