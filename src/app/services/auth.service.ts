import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginResponse, Usuario } from '../models/auth';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  private baseUrl: string = environment.baseUrl;
  private _usuario!: Usuario;

  get usuario() {
    return { ...this._usuario };
  }

  login(usuario: string, password: string) {
    const url = `${this.baseUrl}empleados/login/${usuario}/${password}`;
    this.http.get<LoginResponse>(url).pipe(
      tap((resp) => {
        if (resp.ok) {
          localStorage.setItem('token',resp.token);
          this._usuario = resp;
        }
      }),
      map(resp => resp.ok),
      catchError(err => of(err.error.message))
    );
  }
}
