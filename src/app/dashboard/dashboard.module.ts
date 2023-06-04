import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { HeaderModule } from './components/header/header.module';
import { SidebarModule } from './components/sidebar/sidebar.module';
import { HomeModule } from './pages/home/home.module';
import { HomeComponent } from './pages/home/home.component';
import { RouterModule } from '@angular/router';
import { AdminGuard } from '../auth/guards/admin.guard';

@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    HomeModule,
    HeaderModule,
    SidebarModule,
    RouterModule.forChild([
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'estudiantes',
        loadChildren: () => import("./pages/students/students.module").then((m) => m.StudentsModule), 
      },
      {
        path: 'clases',
        loadChildren: () => import("./pages/classes/classes.module").then((m) => m.ClassesModule), 
      },
      {
        path: 'inscripciones',
        loadChildren: () => import("./pages/inscription/inscription.module").then((m) => m.InscriptionModule),
      },
      {
        path: 'usuarios',
        canActivate:[AdminGuard],
        loadChildren: () => import("./pages/users/users.module").then((m) => m.UsersModule),
      }
    ])
  ],
  exports:[
    DashboardComponent
  ]
})
export class DashboardModule { }
