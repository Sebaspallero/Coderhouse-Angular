import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, concatMap, map } from 'rxjs';
import { CreateInscriptionData, Inscription, InscriptionWithAll } from '../models/inscription';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})


export class InscriptionsService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getInscriptionsWithAll(): Observable<InscriptionWithAll[]>{
   return this.httpClient.get<InscriptionWithAll[]>('http://localhost:3000/inscriptions?_expand=course&_expand=subject&_expand=student')
  };

  createInscription(data: CreateInscriptionData): Observable<InscriptionWithAll> {
    return this.httpClient
      .post<Inscription>(`http://localhost:3000/inscriptions`, data)
      .pipe(
        concatMap((createResponse) =>
          this.getInscriptionWithAllById(createResponse.id)
        )
      );
  }

  getInscriptionWithAllById(id: number): Observable<InscriptionWithAll>{
    return this.httpClient.get<InscriptionWithAll>(`http://localhost:3000/inscriptions/${id}?_expand=course&_expand=subject&_expand=student`)
  }

  deleteInscriptionOnDb(id:number): Observable<unknown> {
    return this.httpClient.delete(`http://localhost:3000/inscriptions/${id}`)
  }

 updateInscriptionOnDb(inscription: Inscription): Observable<Inscription> {
    return this.httpClient.put<Inscription>(`http://localhost:3000/inscriptions/${inscription.id}`, inscription)
  }
}
