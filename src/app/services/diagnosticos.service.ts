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

  getDescripcion(id: string) {
    const url = `${this.baseUrl}diagnosticos/getDescripcion/${id}`;
    console.log(url);
    const headers = new HttpHeaders()
      .set('auth-token', localStorage.getItem('token') || '');

    return this.http.get<Diagnostico>(url, { headers });
  }

  getConsultas(id: string) {
    const formData = {
      codigo: id
    }
    const url = `${this.baseUrl}diagnosticos`;
    console.log(url);
    const headers = new HttpHeaders()
      .set('auth-token', localStorage.getItem('token') || '');

    return this.http.post<Diagnostico[]>(url, formData, { headers });
  }

  getConsultasDescripcion(id: string) {
    const formData = {
      descripcion: id
    }
    const url = `${this.baseUrl}diagnosticos/getDiagnosticosDescripcion`;
    console.log(url);
    const headers = new HttpHeaders()
      .set('auth-token', localStorage.getItem('token') || '');

    return this.http.post<Diagnostico[]>(url, formData, { headers });
  }

}
