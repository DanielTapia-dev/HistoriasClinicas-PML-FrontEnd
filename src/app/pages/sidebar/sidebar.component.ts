import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  sidebar: any;
  nombreRol: string = '';

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.obtenerSidebar().subscribe(resp => {
      this.sidebar = resp.lista;
      this.nombreRol = resp.nombreRol;
    });
  }

  Logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/auth/login');
  }

  changeComponent(url: string) {
    console.log(url);
    this.router.navigate([url]);
  }

}
