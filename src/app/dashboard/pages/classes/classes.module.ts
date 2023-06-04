import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassesComponent } from './classes.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormErrorHelpersModule } from 'src/app/shared/components/form-error-helpers/form-error-helpers.module';
import { MatIconModule } from '@angular/material/icon';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { DirectivesModule } from 'src/app/shared/directives/directives.module';
import { MatNativeDateModule } from '@angular/material/core';
import { ClassesDetailModule } from './classes-detail/classes-detail.module';
import { ClassesRoutingModule } from './classes-routing.module';


@NgModule({
  declarations: [
    ClassesComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormErrorHelpersModule,
    MatIconModule,
    PipesModule,
    DirectivesModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    ClassesDetailModule,
    ClassesRoutingModule
  ],
  exports:[
    ClassesComponent
  ]
})
export class ClassesModule { }
