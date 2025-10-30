import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ChatBot, ChatBotOut, Checkout, CreateUser, Login, PhoneInfo, resCreateUser, ResetPsw, resLogin, resPhoneInfo, responseData, resResetPsw, resSendSms, resUnsubscribe, SendSms, Unsubscribe } from '../../Interface/models';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { UtilitiesService } from './utilities.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private utils:UtilitiesService) {}

  private baseUrl = environment.apiUrl;

  GetOperador(data: PhoneInfo): Observable<resPhoneInfo> {
    const url = `${this.baseUrl}/phone-info`;

    return this.http.post<resPhoneInfo>(url, data,{
      headers: new HttpHeaders({'X-API-KEY': environment.apiSecret,'Content-Type': 'application/json'})
    }
    );
  }

  Unsusbscribe(data: Unsubscribe): Observable<resUnsubscribe> {
    const url = `${this.baseUrl}/unsubscribe`;

    return this.http.post<resUnsubscribe>(url, data,{
      headers: new HttpHeaders({'X-API-KEY': environment.apiSecret,'Content-Type': 'application/json'})
    }
    );
  }

  ResetPsw(data: ResetPsw): Observable<resResetPsw> {
    const url = `${this.baseUrl}/reset-psw`;

    return this.http.post<resResetPsw>(url, data,{
      headers: new HttpHeaders({'X-API-KEY': environment.apiSecret,'Content-Type': 'application/json'})
    }
    );
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

  BotAsistant(chat:ChatBot){
    const url = `${this.baseUrl}/chat`;
    return this.http.post<ChatBotOut>(url,chat,{
      headers: new HttpHeaders({'X-API-KEY': environment.apiSecret,'Content-Type': 'application/json'})
    }).pipe(
      retry(3) // Reintenta la solicitud hasta 3 veces en caso de error
    );
  }

  OnCheckout(data:Checkout): Observable<any> {
    const url = `${this.baseUrl}/checkout`;
    const token = this.utils.getCookie('access_token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(url, data, { headers }).pipe(
    retry(3),
    catchError((error: HttpErrorResponse) => {
      console.error('❌ Error en checkout:', error);
      return throwError(() => new Error(error.message));
    })
  );
  }

}
