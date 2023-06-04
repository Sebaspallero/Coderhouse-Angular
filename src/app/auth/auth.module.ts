import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { LoginModule } from './pages/login/login.module';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';





@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    LoginModule,
    RouterModule.forChild([
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: '**',
        redirectTo: 'login'
      }
    ])
  ],
  exports:[
    AuthComponent
  ]
})
export class AuthModule { }
