import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { LoginGuard } from './auth/guards/login.guard';

 export const routes: Routes = [
  {
    path: 'dashboard',
    canActivate:[AuthGuard],
    component: DashboardComponent,
    loadChildren: () => import("./dashboard/dashboard.module").then((m) => m.DashboardModule), 
  },
  {
    path: 'auth',
    canActivate:[LoginGuard],
    component: AuthComponent,
    loadChildren: () => import ('./auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: '**',
    redirectTo: 'dashboard/home',
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
