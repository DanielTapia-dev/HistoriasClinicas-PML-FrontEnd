import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private authService: AuthService) {
  }

  usuario: any;

  ngOnInit(): void {
    this.cargarUsuario();
  }

  cargarUsuario() {
    console.log(this.authService.usuario.usuario);
    this.usuario = this.authService.usuario;
  }
}
