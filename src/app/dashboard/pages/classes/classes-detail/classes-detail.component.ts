import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CourseWithSubject } from 'src/app/core/models/course';
import { InscriptionWithAll } from 'src/app/core/models/inscription';
import { Student } from 'src/app/core/models/student';
import { CoursesService } from 'src/app/core/services/courses.service';


@Component({
  selector: 'app-classes-detail',
  templateUrl: './classes-detail.component.html',
  styleUrls: ['./classes-detail.component.css']
})
export class ClassesDetailComponent implements OnInit, OnDestroy{
  inscription: InscriptionWithAll[] = []
  course: CourseWithSubject[] = []
  students: Student[] | any = []
  private destroyed$ = new Subject() 

  constructor(
    private activatedRoute: ActivatedRoute,
    private courseService: CoursesService
  ){}

  ngOnInit(): void {
    this.courseService.getCoursetInscriptionsWithAll(parseInt(this.activatedRoute.snapshot.params['id']))
    .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (inscriptions) =>{
          this.inscription = inscriptions
          let students = inscriptions.map(i => i.student)
          this.students = students
        }
      })

    this.courseService.getCoursebyId(parseInt(this.activatedRoute.snapshot.params['id']))
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (course) =>{
          this.course = course
        }
      })
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true)
    this.destroyed$.complete()
  };
}
