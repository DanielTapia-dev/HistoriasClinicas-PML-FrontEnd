import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesRoutingModule } from './pages-routing.module';
import { MainComponent } from './main/main.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AtencionComponent } from './atencion/atencion.component';
import { HistorialesComponent } from './historiales/historiales.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    DashboardComponent,
    MainComponent,
    NavbarComponent,
    SidebarComponent,
    AtencionComponent,
    HistorialesComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    NgxPaginationModule
  ]
})
export class PagesModule { }
