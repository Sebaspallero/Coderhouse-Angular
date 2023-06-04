import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ClassesComponent } from './classes.component';
import { ClassesDetailComponent } from './classes-detail/classes-detail.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ClassesComponent
      },
      {
        path:':id',
        component: ClassesDetailComponent
      }
    ])
  ],
  exports:[
    RouterModule
  ]
})
export class ClassesRoutingModule { }
