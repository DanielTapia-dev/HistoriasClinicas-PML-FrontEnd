import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CargarClientes } from '../interfaces/Cargar.interface';
import { Cliente } from '../models/clientes';

@Injectable({
  providedIn: 'root'
})
export class PacientesService {

  constructor(private http: HttpClient) { }

  private baseUrl: string = environment.baseUrl;

  getClientesCedula(parametro: string) {
    const url = `${this.baseUrl}pacientes/clientesCedula/${parametro
      }`;
    const headers = new HttpHeaders()
      .set('auth-token', localStorage.getItem('token') || '');

    return this.http.get<Cliente[]>(url, { headers });
  }

  getClientesNombre(formData: any) {
    const url = `${this.baseUrl}pacientes/clientesNombre`;
    const headers = new HttpHeaders()
      .set('auth-token', localStorage.getItem('token') || '');

    return this.http.post<Cliente[]>(url, formData, { headers });
  }

}
