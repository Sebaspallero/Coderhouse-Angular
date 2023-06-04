import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Student } from 'src/app/core/models/student';
import { User } from 'src/app/core/models/user';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnDestroy, OnInit {
  user: User | any
  private destroyed$ = new Subject() 

  constructor(
    private activatedRoute: ActivatedRoute,
    private usersService: UsersService
  ){}
  
  ngOnInit(): void {
    this.usersService.getUserbyId(parseInt(this.activatedRoute.snapshot.params['id']))
    .pipe(takeUntil(this.destroyed$))
      .subscribe((user) => this.user = user)
  };

  ngOnDestroy(): void {
    this.destroyed$.next(true)
  };

  /* onDelete(): void{
    delete this.student?.course
    console.log(this.student)
  } */
}
