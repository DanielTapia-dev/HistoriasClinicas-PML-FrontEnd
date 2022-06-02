import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Diagnostico } from '../models/diagnostico';

@Injectable({
  providedIn: 'root'
})
export class DiagnosticosService {

  constructor(private http: HttpClient) { }

  private baseUrl: string = environment.baseUrl;

  getConsultas(id: string) {
    const url = `${this.baseUrl}diagnosticos/${id}`;
    console.log(url);
    const headers = new HttpHeaders()
      .set('auth-token', localStorage.getItem('token') || '');

    return this.http.get<Diagnostico[]>(url, { headers });
  }

  getConsultasDescripcion(id: string) {
    const url = `${this.baseUrl}diagnosticos/getDiagnosticosDescripcion/${id}`;
    console.log(url);
    const headers = new HttpHeaders()
      .set('auth-token', localStorage.getItem('token') || '');

    return this.http.get<Diagnostico[]>(url, { headers });
  }

}
