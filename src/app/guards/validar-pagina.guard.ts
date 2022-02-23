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
    if (this.authService.usuario.tipo = 'Medico') {
      this.router.navigateByUrl('/');
      return true;
    } else {
      return false;
    }
  }
  canLoad(): Observable<boolean> | boolean {
    if (this.authService.usuario.tipo = 'Medico') {
      this.router.navigateByUrl('/');
      return true;
    } else {
      return false;
    }
  }
}