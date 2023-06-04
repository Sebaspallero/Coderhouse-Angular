import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { CourseWithSubject } from 'src/app/core/models/course';
import { InscriptionWithAll } from 'src/app/core/models/inscription';
import { Student } from 'src/app/core/models/student';
import { User } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { CoursesService } from 'src/app/core/services/courses.service';
import { StudentsService } from 'src/app/core/services/students.service';
import { InscriptionsActions } from './store/inscriptions.actions';
import { selectInscriptionsState } from './store/inscriptions.selectors';
import { State } from './store/inscriptions.reducer';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnDestroy, OnInit {

  private destroyed$ = new Subject();

  state$: Observable<State>
  authUser$: Observable<User | null>;
  courseList: CourseWithSubject[] = [];
  studentList: Student[] = [];
  inscriptionsList: any = []

  selectedCourseControl = new FormControl<any>(null, [Validators.required]);

  studentIdControl = new FormControl<any>(null, [Validators.required]);
  subjectIdControl = new FormControl<number | any>(null, [Validators.required]);
  courseIdControl = new FormControl<number | null>(null, [Validators.required]);

  inscriptionForm = new FormGroup({
    subjectId: this.subjectIdControl,
    courseId: this.courseIdControl,
    studentId: this.studentIdControl
  });


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private courseService : CoursesService,
    private studentService : StudentsService,
    private authService: AuthService,
    private store: Store
  )
  {

  this.state$ = this.store.select(selectInscriptionsState);
  this.authUser$ = this.authService.getVerifiedStudent();

  this.selectedCourseControl.valueChanges
    .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (course) => {
          if (course) {
            const c = this.courseList.find(c => c.id == course)
            this.subjectIdControl.setValue(c?.subjectId);
            this.courseIdControl.setValue(parseInt(course));
          }
        },
      });
  }

  

  ngOnInit(): void {

    this.store.dispatch(InscriptionsActions.loadInscriptions())

    this.state$.subscribe({
      next: (inscriptions) => this.inscriptionsList = inscriptions?.inscriptions
    })

    this.courseService.getCoursesFromDb()
      .pipe(takeUntil(this.destroyed$))
        .subscribe({
          next:(courses) =>{
            this.courseList = courses
          }
        });
        
    this.studentService.getStudentFromDb()
        .pipe(takeUntil(this.destroyed$))
        .subscribe({
          next: (students) => {
            this.studentList = students
          }
        })
  }

   ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete()
  };


  //AGREGAR INSCRIPCIÓN
  inscriptionExist: boolean | undefined

  onSubmit():void {
    const studentId = parseInt(this.studentIdControl.value) 
    const courseId = (this.courseIdControl.value)
    if(this.inscriptionsList.find((inscription: InscriptionWithAll) => inscription.studentId == studentId && inscription.courseId == courseId)){
      this.inscriptionExist = true
      return
    }
    
    if(this.inscriptionForm.valid)
    {
      this.store.dispatch(InscriptionsActions.createInscription({
        data: {
          studentId: parseInt(this.studentIdControl.value),
          subjectId: this.subjectIdControl.value,
          courseId: (this.courseIdControl.value as number)
        }
      }))
      this.inscriptionExist = false
      this.inscriptionForm.reset();
      this.selectedCourseControl.reset();
    }
    else{
      this.inscriptionForm.markAllAsTouched();
    }
  };


  //ELIMINAR INSCRIPCIÓN
  selectedIndex = -1

  onDelete(id: number): void{
    this.selectedIndex = id
    setTimeout(() => {
      this.store.dispatch(InscriptionsActions.deleteInscription({id}))
    }, 1500);
  };

  //MOSTRAR DATOS DE LA INSCRIPCIÓN EN FORM
  inscriptionIndex!: number;
  isEditing: boolean | undefined;
  inscriptionId!: number;

  public onEdit(inscription: InscriptionWithAll, index:any){
    this.inscriptionIndex = index
    this.inscriptionId = inscription.id
    this.isEditing = true

    this.studentIdControl.setValue(inscription.studentId)
    this.selectedCourseControl.setValue(inscription.courseId)
    
  }

  //ACTUALIZAR DATOS DE LA INSCRIPCIÓN

  public update() {
    const studentId = parseInt(this.studentIdControl.value) 
    const courseId = (this.courseIdControl.value)
    if(this.inscriptionsList.find((inscription: InscriptionWithAll) => inscription.studentId == studentId && inscription.courseId == courseId)){
      this.inscriptionExist = true
      return
    }
    if(this.inscriptionForm.valid){
      this.store.dispatch(InscriptionsActions.updateInscription({
        data: {
          studentId: parseInt(this.studentIdControl.value),
          subjectId: this.subjectIdControl.value,
          courseId: (this.courseIdControl.value as number),
          id: this.inscriptionId
        }
      }))
      this.isEditing = false;
      this.inscriptionExist = false
      this.inscriptionForm.reset();
      this.selectedCourseControl.reset();
      this.store.dispatch(InscriptionsActions.loadInscriptions())
  
    } 
    else{
      this.inscriptionForm.markAllAsTouched();
    }
  } 
  
  //NAVEGAR AL DETALLE DE LA INSCRIPCIÓN
  navigateToDetail(inscriptionId: number):void{
    this.router.navigate([inscriptionId],{
      relativeTo: this.activatedRoute
    })
  }
}

