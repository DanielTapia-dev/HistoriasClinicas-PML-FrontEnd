import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { ValidarPaginaGuard } from '../guards/validar-pagina.guard';
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
        component: AtencionComponent
      },
      {
        path: 'historiales',
        component: HistorialesComponent,
        canActivate: [ValidarPaginaGuard],
        canLoad: [ValidarPaginaGuard]
      },
      {
        path: '',
        component: DashboardComponent
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
