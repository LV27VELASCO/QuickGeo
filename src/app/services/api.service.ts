import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CreateUser, Login, PhoneInfo, resCreateUser, resLogin, resPhoneInfo, responseData, resSendSms, SendSms } from '../../Interface/models';
import { Observable, retry } from 'rxjs';
import { UtilitiesService } from './utilities.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private utils:UtilitiesService) {}

  private baseUrl = environment.apiUrl;

  GetOperador(data: PhoneInfo): Observable<resPhoneInfo> {
    const url = `${this.baseUrl}/phone-info`;
    return this.http.post<resPhoneInfo>(url, data);
  }

  SendSms(data: SendSms): Observable<resSendSms> {
    const url = `${this.baseUrl}/send-sms`;
    const token = this.utils.getCookie('access_token')
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<resSendSms>(url, data,{headers});
  }

  CreateUser(data: CreateUser): Observable<resCreateUser> {
    const url = `${this.baseUrl}/create-user`;
    return this.http.post<resCreateUser>(url, data);
  }

  LoginUser(data: Login): Observable<resLogin> {
    const url = `${this.baseUrl}/login`;
    return this.http.post<resLogin>(url, data,{ withCredentials: true });
  }

  GetHistoryLocations(): Observable<responseData> {
    const url = `${this.baseUrl}/location-requests`;
    const token = this.utils.getCookie('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.get<responseData>(url, { headers }).pipe(
      retry(3) // Reintenta la solicitud hasta 3 veces en caso de error
    );
  }

}
