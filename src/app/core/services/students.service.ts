import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Student } from '../models/student';
import { HttpClient } from '@angular/common/http';
import { Inscription, InscriptionWithAll } from '../models/inscription';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  private students$ = new BehaviorSubject<Student[]>([])

  constructor(
    private httpClient: HttpClient
  ) { }

  get students(): Observable<Student[]>{
    return this.students$.asObservable()
  }

  getStudents(): void{
    this.httpClient.get<[Student]>(`http://localhost:3000/students`)
      .subscribe({
        next: (students) =>{
          this.students$.next(students)
        }
      })
  };

  getStudentFromDb(): Observable<Student[]>{
    return this.httpClient.get<Student[]>(`http://localhost:3000/students`)
  }

  getStudentbyId(id: number): Observable<Student>{
    return this.httpClient.get<Student>(`http://localhost:3000/students/${id}`)
  };

  getStudentInscriptionswithAll(id: number): Observable<[InscriptionWithAll]>{
    return this.httpClient.get<[InscriptionWithAll]>(`http://localhost:3000/inscriptions?studentId=${id}&_expand=course&_expand=subject&_expand=student`)
  };

  getStudentInscriptions(id: number): Observable<Inscription>{
    return this.httpClient.get<Inscription>(`http://localhost:3000/inscriptions?studentId=${id}`)
  };

  //ARREGLAR
  deleteStudentFromCourse(inscription: any): Observable<Inscription>{
    console.log(inscription)
    return this.httpClient.put<Inscription>(`http://localhost:3000/inscriptions/${inscription[0]?.courseId}`, inscription)
  };

  postStudentOnDb(student: Student): Observable<Student> {
    return this.httpClient.post<Student>(`http://localhost:3000/students`, student)
  }

  deleteStudentOnDb(id:number): Observable<Student> {
    return this.httpClient.delete<Student>(`http://localhost:3000/students/${id}`)
  }

 updateStudentOnDb(student: Student): Observable<Student> {
    return this.httpClient.put<Student>(`http://localhost:3000/students/${student.id}`, student)
  }
}
