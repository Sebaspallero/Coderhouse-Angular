import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InscriptionComponent } from './inscription.component';
import { InscriptionDetailComponent } from './inscription-detail/inscription-detail.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: InscriptionComponent
      },
      {
        path:':id',
        component: InscriptionDetailComponent
      }
    ])
  ],
  exports:[
    RouterModule
  ]
})
export class InscriptionsRoutingModule { }
