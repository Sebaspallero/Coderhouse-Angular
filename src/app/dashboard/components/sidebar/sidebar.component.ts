import { Component, OnDestroy } from '@angular/core';
import { generalLinks, settingsLinks } from './nav-items';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { Observable, Subject } from 'rxjs';
import { User } from 'src/app/core/models/user';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnDestroy {

  authUser$: Observable<User | null>
  private destroyed$ = new Subject() 
  
  constructor(
    private router: Router,
    private authService: AuthService
  ){
    this.authUser$ = this.authService.getVerifiedStudent()
  }


  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  logOut(): void {
    this.authService.logOut()
  }

  navigateToHome(): void {
    this.router.navigate(['dashboard', 'home'])
  }

  navigateToUsers(): void{
    this.router.navigate(['dashboard','usuarios'])
  }

  generalLinks = generalLinks;
  settingsLinks = settingsLinks;
  
}


