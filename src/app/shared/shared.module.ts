import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorPageComponent } from './error-page/error-page.component';
import { SharedRoutingModule } from './shared-routing.module';



@NgModule({
  declarations: [
    ErrorPageComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ]
})
export class SharedModule { }
