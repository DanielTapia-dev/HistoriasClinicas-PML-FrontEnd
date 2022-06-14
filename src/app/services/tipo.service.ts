import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Tipo } from '../models/tipo';

@Injectable({
  providedIn: 'root'
})
export class TipoService {

  constructor(private http: HttpClient) { }

  private baseUrl = environment.baseUrl;

  getTipos() {
    const url = `${this.baseUrl}tipo`;
    const headers = new HttpHeaders().set('auth-token', localStorage.getItem('token') || '');
    return this.http.get<Tipo[]>(url, { headers });
  }

  getTipoPorId(id: number) {
    const url = `${this.baseUrl}tipo/getTipoPorId/${id}`;
    const headers = new HttpHeaders().set('auth-token', localStorage.getItem('token') || '');
    return this.http.get<Tipo[]>(url, { headers });
  }
}
