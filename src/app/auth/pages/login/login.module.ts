import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormErrorHelpersModule } from 'src/app/shared/components/form-error-helpers/form-error-helpers.module';




@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormErrorHelpersModule
    
  ]
})
export class LoginModule { }
