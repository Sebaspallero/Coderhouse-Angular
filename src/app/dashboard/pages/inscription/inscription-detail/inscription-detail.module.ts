import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InscriptionDetailComponent } from './inscription-detail.component';



@NgModule({
  declarations: [
    InscriptionDetailComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    InscriptionDetailComponent
  ]
})
export class InscriptionDetailModule { }
