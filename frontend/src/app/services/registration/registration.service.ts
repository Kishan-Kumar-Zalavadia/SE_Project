import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: "root",
})
export class RegistrationService {
  
  private baseUrl = "http://localhost:9292";

  constructor(private _http: HttpClient) {}

  public loginUserFromRemote(user: User): Observable<any> {
    // return this._http.post<any>("http://localhost:9292/users/login", user);
    const url = `${this.baseUrl}/users/login`;
    return this._http.post<any>(url, user);
  }
  public registraterUserFromRemote(user: User): Observable<any> {
    // return this._http.post<any>("http://localhost:9292/users/register", user);
    const url = `${this.baseUrl}/users/register`;
    return this._http.post<any>(url, user);
  }
}
