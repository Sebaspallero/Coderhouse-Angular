import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { InscriptionWithAll } from '../models/inscription';
import { Course, CourseWithSubject } from '../models/course';



@Injectable({
  providedIn: 'root'
})

export class CoursesService {


  private course$ = new BehaviorSubject<CourseWithSubject[]>([]); 

  constructor(
    private httpClient: HttpClient
  ) {}

  
  get courses(): Observable<CourseWithSubject[]>{
    return this.course$.asObservable()
  }

  getCourses(): void{
    this.httpClient.get<[CourseWithSubject]>(`http://localhost:3000/courses?_expand=subject`)
      .subscribe({
        next: (course) =>{
          this.course$.next(course)
        }
      })
  };

  getCoursesFromDb(): Observable<[CourseWithSubject]>{
    return this.httpClient.get<[CourseWithSubject]>(`http://localhost:3000/courses?_expand=subject`)
  }

  getCoursebyId(id: number): Observable<[CourseWithSubject]>{
    return this.httpClient.get<[CourseWithSubject]>(`http://localhost:3000/courses?id=${id}&_expand=subject`)
  };

  getCoursetInscriptionsWithAll(id: number): Observable<[InscriptionWithAll]>{
    return this.httpClient.get<[InscriptionWithAll]>(`http://localhost:3000/inscriptions?courseId=${id}&_expand=course&_expand=subject&_expand=student`)
  };

  postCourseOnDb(course: Course): Observable<Course> {
    return this.httpClient.post<Course>(`http://localhost:3000/courses`, course)
  }

  deleteCourseOnDb(id:number): Observable<CourseWithSubject> {
    return this.httpClient.delete<CourseWithSubject>(`http://localhost:3000/courses/${id}`)
  }

 updateCourseOnDb(course: CourseWithSubject): Observable<CourseWithSubject> {
    return this.httpClient.put<CourseWithSubject>(`http://localhost:3000/courses/${course.id}`, course)
  }
}
