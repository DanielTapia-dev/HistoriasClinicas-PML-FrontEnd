import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Cronologia } from '../models/cronologia';

@Injectable({
  providedIn: 'root'
})
export class CronologiaService {

  constructor(private http: HttpClient) { }

  private baseUrl = environment.baseUrl;

  getCronologiasActivas() {
    const url = `${this.baseUrl}cronologia`;
    const headers = new HttpHeaders().set('auth-token', localStorage.getItem('token') || '');
    return this.http.get<Cronologia[]>(url, { headers });
  }

  getCronologiaPorId(id: number) {
    const url = `${this.baseUrl}cronologia/getCronologiaPorId/${id}`;
    const headers = new HttpHeaders().set('auth-token', localStorage.getItem('token') || '');
    return this.http.get<Cronologia[]>(url, { headers });
  }

}
