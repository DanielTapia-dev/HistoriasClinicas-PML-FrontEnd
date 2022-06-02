import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { ValidarPaginaGuard } from '../guards/validar-pagina.guard';
import { ValidarTokenGuard } from '../guards/validar-token.guard';
import { AtencionComponent } from './atencion/atencion.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HistorialesComponent } from './historiales/historiales.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'atencion',
        component: AtencionComponent,
        canActivate: [ValidarTokenGuard],
        canLoad: [ValidarTokenGuard]
      },
      {
        path: 'historiales',
        component: HistorialesComponent,
        canActivate: [ValidarPaginaGuard, ValidarTokenGuard],
        canLoad: [ValidarPaginaGuard, ValidarTokenGuard]
      },
      {
        path: '',
        component: DashboardComponent,
        canActivate: [ValidarTokenGuard],
        canLoad: [ValidarTokenGuard]
      },
      {
        path: '**',
        redirectTo: ''
      },
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class PagesRoutingModule { }
