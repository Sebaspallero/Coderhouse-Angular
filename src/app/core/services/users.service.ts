import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private users$ = new BehaviorSubject<User[]>([])

  constructor(
    private httpClient: HttpClient
  ) { }

  getUserFromDb(): Observable<User[]>{
    return this.httpClient.get<User[]>(`http://localhost:3000/users`)
  }

  getUserbyId(id: number): Observable<User>{
    return this.httpClient.get<User>(`http://localhost:3000/users/${id}`)
  };

  postUserOnDb(user: User): Observable<User> {
    return this.httpClient.post<User>(`http://localhost:3000/users`, user)
  }

  deleteUserOnDb(id:number): Observable<User> {
    return this.httpClient.delete<User>(`http://localhost:3000/users/${id}`)
  }

 updateUsertOnDb(user: User): Observable<User> {
    return this.httpClient.put<User>(`http://localhost:3000/users/${user.id}`, user)
  }
}
