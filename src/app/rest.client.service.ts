
import { Injectable, isDevMode } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs/Rx';
@Injectable()
export class RestClientService {

  private headers;
  logginStatus = new Subject<any>();
  constructor(private _http: HttpClient) {
    const requestHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
    this.headers = new HttpHeaders(requestHeaders);
  }

  
  getloginStatus(): Observable<any> {
    return (this.logginStatus);
}
setloginStatus(status) {
    this.logginStatus.next(status);
}
  post<T>(url: string, requestData?: any, responsetype?: any): Observable<T> {

    return this._http.post<T>(url, requestData, { headers: this.headers, responseType: responsetype });
  }

  get<T>(url: string, responsetype?: any): Observable<T> {
    return this._http.get<T>(url, { headers: this.headers, responseType: responsetype });
  }


}
