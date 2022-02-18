import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
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
