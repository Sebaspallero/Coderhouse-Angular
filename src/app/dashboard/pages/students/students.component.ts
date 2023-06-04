import { Component, OnDestroy, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Student } from 'src/app/core/models/student';
import { User } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { StudentsService } from 'src/app/core/services/students.service';


@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})

export class StudentsComponent implements OnDestroy, OnInit {

  studentsList: Student[] = [];
  private destroyed$ = new Subject() ;
  authUser$: Observable<User | null>;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private studentsService: StudentsService,
    private authService: AuthService,
    )
  {
    this.studentsForm = new FormGroup({
      name: this.nameControl,
      lastName: this.lastNameControl,
      email: this.emailControl,
      gender: this.genderControl,
    })

    this.authUser$ = this.authService.getVerifiedStudent()
  }

  ngOnInit(): void {
    this.studentsService.students
      .pipe(takeUntil(this.destroyed$))
        .subscribe({
          next:(students) =>{
            this.studentsList = students
          }
        })
    this.studentsService.getStudents()
  }

   ngOnDestroy(): void {
      this.destroyed$.next(true)
      this.destroyed$.complete()
  };

  studentsForm: FormGroup;

  nameControl = new FormControl('',[Validators.required,Validators.minLength(3)]);
  lastNameControl = new FormControl( '',[Validators.required]);
  emailControl = new FormControl( '',[Validators.required,Validators.email]);
  genderControl = new FormControl( '',[Validators.required,]);

  //AGREGAR ESTUDIANTE
  onSubmit():void{
    if(this.studentsForm.valid){
      this.studentsService.postStudentOnDb({...this.studentsForm.value, registrationDate: new Date()})
      .pipe(takeUntil(this.destroyed$))
        .subscribe(
          student => this.studentsList.push(student)
        )
      this.studentsForm.reset();
    }
    else{
      this.studentsForm.markAllAsTouched();
    }
    
  };

  //ELIMINAR ESTUDIANTE
  selectedIndex = -1;

  public onDelete(id: number){
    this.selectedIndex = id;
    setTimeout(() => {
       this.studentsService.deleteStudentOnDb(id)
        .pipe(takeUntil(this.destroyed$))
         .subscribe({
          next: (response) =>{
            const deletedUser = this.studentsList.filter(student => student.id !== id);
            this.studentsList = deletedUser
          }
         })
    }, 1500);
  };

  //MOSTRAR DATOS DEL ESTUDIANTE EN FORM
  studentIndex!: number;
  isEditing: boolean | undefined;
  studentId: number | undefined;
  studentRegistration: string | undefined;

  public onEdit(student: any, index:any){
    this.studentIndex = index
    this.studentId = student.id
    this.studentRegistration = student.registrationDate
  
    this.nameControl.setValue(student.name)
    this.lastNameControl.setValue(student.lastName)
    this.emailControl.setValue(student.email)
    this.genderControl.setValue(student.gender)

    this.isEditing = true
  }

  //ACTUALIZAR DATOS DEL ESTUDIANTE
  public update() {
    if(this.studentsForm.valid){
      this.studentsService.updateStudentOnDb(
        {...this.studentsForm.value, id: this.studentId, registrationDate: this.studentRegistration})
        .pipe(takeUntil(this.destroyed$))
        .subscribe({
          next:(response) =>{
            this.studentsList[this.studentIndex] = response
            this.isEditing = false;
            this.studentsForm.reset();
          }}) 
    } 
    else{
      this.studentsForm.markAllAsTouched();
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
