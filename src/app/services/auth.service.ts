import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Usuario } from "../interfaces/Usuario";
import { tap } from 'rxjs/operators';

export interface LoginResponse {
  jwt: string;
  user_id: string;
}

@Injectable({
  providedIn: "root"
})

export class AuthService {

  private readonly apiUrl="http://localhost:8080/usuarios/";
  // private readonly apiUrl = 'https://whatthebook.up.railway.app/usuarios/';
  private readonly tokenKey = 'auth_token';

  constructor(private http: HttpClient) {

  }

  login(email: string, password:string) {
    return this.http.post<LoginResponse>(`${this.apiUrl}login`, {email, password})
    .pipe(
      tap((response) => {
        localStorage.setItem(this.tokenKey, response.jwt);
        localStorage.setItem('userlogin', response.user_id);
      })
    );;
  }

  register(user: Usuario) {
    return this.http.post<LoginResponse>(`${this.apiUrl}register`, {user})
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
