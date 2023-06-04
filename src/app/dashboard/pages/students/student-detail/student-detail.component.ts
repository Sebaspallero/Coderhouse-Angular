import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentsService } from 'src/app/core/services/students.service';
import { Subject, takeUntil } from 'rxjs';
import { Student } from 'src/app/core/models/student';


@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})


export default class StudentDetailComponent implements OnDestroy, OnInit {

  student: Student | undefined;
  subjects: any = [];
  inscription: any[] = []
  private destroyed$ = new Subject() 

  constructor(
    private activatedRoute: ActivatedRoute,
    private studentsService: StudentsService,
 
  ){}
  ngOnInit(): void {
    this.studentsService.getStudentbyId(parseInt(this.activatedRoute.snapshot.params['id']))
    .pipe(takeUntil(this.destroyed$))
      .subscribe((student) => this.student = student)

    this.studentsService.getStudentInscriptionswithAll(parseInt(this.activatedRoute.snapshot.params['id']))
    .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (inscriptions) =>{
          this.inscription = inscriptions
          let subjects = inscriptions.map(i => i.subject);
          this.subjects = subjects
        }
      })         
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true)
    this.destroyed$.complete()
  };
  
}
