import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ValidarPaginaGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService,
    private router: Router
  ) {

  }

  canActivate(): Observable<boolean> | boolean {
    if (this.authService.usuario.usuario.tipo == 'Médico') {
      return true;
    } else {
      this.router.navigateByUrl('/');
      return false;
    }
  }
  canLoad(): Observable<boolean> | boolean {
    if (this.authService.usuario.tipo == 'Médico') {
      return true;
    } else {
      this.router.navigateByUrl('/');
      return false;
    }
  }
}