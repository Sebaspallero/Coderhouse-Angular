import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectivesModule } from './directives/directives.module';
import { PipesModule } from './pipes/pipes.module';
import { FormErrorHelpersModule } from './components/form-error-helpers/form-error-helpers.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports:[
    DirectivesModule,
    PipesModule,
    FormErrorHelpersModule
  ]
})
export class SharedModule { }
