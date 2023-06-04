import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import StudentDetailComponent from './student-detail.component';
import { MatIconModule } from '@angular/material/icon';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';



@NgModule({
  declarations: [
    StudentDetailComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    PipesModule,
  ],
  exports:[
    StudentDetailComponent
  ]
})
export class StudentDetailModule { }
