import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { User } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnDestroy, OnInit {
  usersList: User[] = [];
  private destroyed$ = new Subject() ;
  authUser$: Observable<User | null>;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private usersService: UsersService,
    private authService: AuthService,
    )
  {
    this.authUser$ = this.authService.getVerifiedStudent()

    this.userForm = new FormGroup({
      name: this.nameControl,
      lastName: this.lastNameControl,
      email: this.emailControl,
      gender: this.genderControl,
      password: this.passwordControl,
      role: this.roleControl,
    })
  }

  ngOnInit(): void {
    this.usersService.getUserFromDb()
        .pipe(takeUntil(this.destroyed$))
        .subscribe({
          next: (users) => {
            this.usersList = users
          }
        })

    this.authUser$ = this.authService.getVerifiedStudent()
  }

   ngOnDestroy(): void {
      this.destroyed$.next(true)
      this.destroyed$.complete()
  };

  userForm: FormGroup;

  nameControl = new FormControl('',[Validators.required,Validators.minLength(3)]);
  lastNameControl = new FormControl( '',[ Validators.required]);
  emailControl = new FormControl( '',[Validators.required, Validators.email]);
  genderControl = new FormControl( '',[Validators.required,]);
  passwordControl = new FormControl( '',[Validators.required,Validators.minLength(5)]);
  roleControl = new FormControl( '',[Validators.required,]);

  //AGREGAR USUARIO
  onSubmit():void{
    if(this.userForm.valid){
      this.usersService.postUserOnDb({...this.userForm.value, token: Date.now()})
      .pipe(takeUntil(this.destroyed$))
        .subscribe(
          user => this.usersList.push(user)
        )
      this.userForm.reset();
    }
    else{
      this.userForm.markAllAsTouched();
  }};


  //ELIMINAR USUARIO
  selectedIndex = -1;

  public onDelete(id: number){
    this.selectedIndex = id;
    setTimeout(() => {
       this.usersService.deleteUserOnDb(id)
        .pipe(takeUntil(this.destroyed$))
         .subscribe({
          next: (response) =>{
            const deletedUser = this.usersList.filter(student => student.id !== id);
            this.usersList = deletedUser
          }
         })
    }, 1500);
  };

  //MOSTRAR DATOS DEL ESTUDIANTE EN FORM
  studentIndex!: number;
  isEditing: boolean | undefined;
  userId: number | undefined;
  userToken: number | undefined

  public onEdit(user: User, index:any){
    this.studentIndex = index
    this.userId = user.id
    this.userToken = user.token

    this.nameControl.setValue(user.name)
    this.lastNameControl.setValue(user.lastName)
    this.emailControl.setValue(user.email)
    this.genderControl.setValue(user.gender)
    this.passwordControl.setValue(user.password)
    this.roleControl.setValue(user.role)

    this.isEditing = true
  }

  //ACTUALIZAR DATOS DEL ESTUDIANTE
  public update() {
    if(this.userForm.valid){
      this.usersService.updateUsertOnDb(
        {...this.userForm.value, id: this.userId, token: this.userToken})
        .pipe(takeUntil(this.destroyed$))
        .subscribe({
          next:(response) =>{
            this.usersList[this.studentIndex] = response
            this.isEditing = false;
            this.userForm.reset();
          }}) 
    } 
    else{
      this.userForm.markAllAsTouched();
    }
  }


  //NAVEGAR AL DETALLE DEL ESTUDIANTE
  navigateToDetail(studentId: number):void{
    this.router.navigate([studentId],
    {
      relativeTo: this.activatedRoute
    })
  }
}

