import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Condicion } from '../models/condicion';

@Injectable({
  providedIn: 'root'
})
export class CondicionService {

  constructor(private http: HttpClient) { }

  private baseUrl = environment.baseUrl;

  getCondiciones() {
    const url = `${this.baseUrl}condicion`
    const headers = new HttpHeaders().set('auth-token', localStorage.getItem('token') || '');
    return this.http.get<Condicion[]>(url, { headers })
  }


  getCondicionPorId(id: number) {
    const url = `${this.baseUrl}condicion/getCondicionPorId/${id}`;
    const headers = new HttpHeaders().set('auth-token', localStorage.getItem('token') || '');
    return this.http.get<Condicion[]>(url, { headers });
  }

}
