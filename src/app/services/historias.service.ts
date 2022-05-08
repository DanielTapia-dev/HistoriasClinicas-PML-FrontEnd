import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Historia } from '../models/historias';

@Injectable({
  providedIn: 'root'
})
export class HistoriasService {

  constructor(private http: HttpClient) { }

  private baseUrl: string = environment.baseUrl;

  postHistoria(formData: any) {
    const url = `${this.baseUrl}historias/crearHistoria`;
    const headers = new HttpHeaders()
      .set('auth-token', localStorage.getItem('token') || '');

    return this.http.post<any>(url, formData, { headers });
  }

  getHistoriasPorId(ciu_per: number) {
    const url = `${this.baseUrl}historias/${ciu_per}`;
    const headers = new HttpHeaders()
      .set('auth-token', localStorage.getItem('token') || '');

    return this.http.get<Historia[]>(url, { headers });
  }

  putHistoria(id1: any, id2: any, id3: any) {
    const url = `${this.baseUrl}historias/editarHistoria/${id1}/${id2}/${id3}`;
    const headers = new HttpHeaders()
      .set('auth-token', localStorage.getItem('token') || '');

    return this.http.get<any>(url, { headers });
  }

}
