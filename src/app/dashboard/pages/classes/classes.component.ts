import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { CourseWithSubject } from 'src/app/core/models/course';
import { User } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { CoursesService } from 'src/app/core/services/courses.service';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit, OnDestroy{

  private destroyed$ = new Subject();
  authUser$: Observable<User | null>;
  coursesList: CourseWithSubject[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private coursesService: CoursesService,
    private authService: AuthService
  )
  {
    this.coursesForm = new FormGroup({
      subjectId: this.nameControl,
      startDate: this.startDateControl,
      endDate: this.endDateControl
    })

    const currentYear = new Date().getFullYear();
    this.minDate = new Date;
    this.maxDate = new Date(currentYear + 1, 11, 31);

    this.authUser$ = this.authService.getVerifiedStudent()
  }

  minDate: Date;
  maxDate: Date;

  ngOnInit(): void {
    this.coursesService.courses
      .pipe(takeUntil(this.destroyed$))
        .subscribe({
          next:(courses) =>{
            this.coursesList = courses
          }
        })
    this.coursesService.getCourses()    
  }

   ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete()
  };

  coursesForm: FormGroup;

  nameControl = new FormControl(
    '',
    [
      Validators.required,
    ]
  );

  startDateControl = new FormControl(
    '',
    [
      Validators.required,
    ]
  );

  endDateControl = new FormControl(
    '',
    [
      Validators.required,
    ]
  );

  //AGREGAR CURSO
  onSubmit():void{
    if(this.coursesForm.valid){
      const subjectId = parseInt(this.nameControl.value as string)
      this.coursesService.postCourseOnDb({...this.coursesForm.value, subjectId: subjectId})
      .pipe(takeUntil(this.destroyed$))
        .subscribe({
          next: (response) =>{
            this.coursesService.getCourses()
            this.coursesForm.reset();
          }})
      }
      else{
        this.coursesForm.markAllAsTouched();
      }
    };

  //ELIMINAR CURSO
  selectedIndex = -1

  public onDelete(id: number){
    this.selectedIndex = id
    setTimeout(() => {
      this.coursesService.deleteCourseOnDb(id)
        .pipe(takeUntil(this.destroyed$))
        .subscribe({
          next: (response) =>{
            const deletedCourse = this.coursesList?.filter(course => course.id !== id);
            this.coursesList = deletedCourse
          }
         })
    }, 1500);
  };

  //MOSTRAR DATOS DEL CURSO EN FORM
  courseIndex!: number;
  isEditing: boolean | undefined;
  courseId: number | any;
  subjectId: number | any

  public onEdit(course: any, index:any){
    this.courseIndex = index
    this.courseId = course.id
    this.subjectId = course.subject.id
    this.isEditing = true

    this.nameControl.setValue(course.subjectId)
    this.startDateControl.setValue(course.startDate)
    this.endDateControl.setValue(course.endDate)
    
  }

  //ACTUALIZAR DATOS DEL ESTUDIANTE

   public update() {
    if(this.coursesForm.valid){
      const subjectId = parseInt(this.coursesForm.value.subjectId)
      this.coursesService.updateCourseOnDb({...this.coursesForm.value, id: this.courseId, subjectId: subjectId})
        .pipe(takeUntil(this.destroyed$))
        .subscribe({
          next:(response) =>{
            this.coursesList[this.courseIndex] = response
            this.isEditing = false;
            this.coursesForm.reset();
            this.coursesService.getCourses()
          }})   
      } 
    else{
      this.coursesForm.markAllAsTouched();
    }
  } 

  //NAVEGAR AL DETALLE DEL ESTUDIANTE
   navigateToDetail(courseId: number):void{
    this.router.navigate([courseId],{
      relativeTo: this.activatedRoute
    })
  } 
}
