import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Usuarios } from "../interfaces/usuarios";
import { tap } from 'rxjs/operators';

export interface LoginResponse {
  jwt: string;
}

@Injectable({
  providedIn: "root"
})

export class AuthService {

  private readonly apiUrl="http://localhost:8080/usuaria/autentica";
  private readonly tokenKey = 'auth_token';

  constructor(private http: HttpClient) {

  }

  login(username: string, pass:string) {
    return this.http.post<LoginResponse>(`${this.apiUrl}`, {username, pass})
    .pipe(
      tap((response) => {
        localStorage.setItem(this.tokenKey, response.jwt);
      })
    );;
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
  }

  get isAuthenticated() {
    return !!localStorage.getItem(this.tokenKey);
  }

  get authToken() {
    return localStorage.getItem(this.tokenKey);
  }

}
