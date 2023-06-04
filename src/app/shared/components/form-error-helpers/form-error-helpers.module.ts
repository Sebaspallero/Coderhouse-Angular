import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormErrorHelpersComponent } from './form-error-helpers.component';



@NgModule({
  declarations: [
    FormErrorHelpersComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    FormErrorHelpersComponent
  ]
})
export class FormErrorHelpersModule { }
