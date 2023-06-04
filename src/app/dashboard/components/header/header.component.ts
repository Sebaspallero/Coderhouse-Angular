import { Component, OnDestroy, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { TimeService } from 'src/app/core/services/time.service';
import { Router} from '@angular/router';
import { User } from 'src/app/core/models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements  OnDestroy {

  @Input() title: string = '';
  authUser$: Observable<User | null>
  private destroyed$ = new Subject() 

  constructor(
    private authService: AuthService,
    private router:  Router
    ){
    this.authUser$ = this.authService.getVerifiedStudent()
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  };
}
