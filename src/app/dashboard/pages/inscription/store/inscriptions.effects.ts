import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { InscriptionsActions } from './inscriptions.actions';
import { InscriptionsService } from 'src/app/core/services/inscriptions.service';


@Injectable()
export class InscriptionsEffects {

  loadInscriptions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionsActions.loadInscriptions),
      concatMap(() =>
        this.inscriptionService.getInscriptionsWithAll().pipe(
          map(data => InscriptionsActions.loadInscriptionsSuccess({ data })),
          catchError(error => of(InscriptionsActions.loadInscriptionsFailure({ error }))))
      )
    );
  });

  deleteInscription$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionsActions.deleteInscription),
      concatMap((action) =>
        this.inscriptionService.deleteInscriptionOnDb(action.id).pipe(
          map(data => InscriptionsActions.deleteInscriptionSuccess({ data: action.id })),
          catchError(error => of(InscriptionsActions.deleteInscriptionFailure({ error })))
        )
      )
    );
  });

  createInscription$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionsActions.createInscription),
      concatMap((action) =>
        this.inscriptionService.createInscription(action.data).pipe(
          map(res => InscriptionsActions.createInscriptionSuccess({ data: res })),
          catchError(error => of(InscriptionsActions.createInscriptionFailure({ error })))
        )
      )
    );
  });

  updateInscription$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionsActions.updateInscription),
      concatMap((action) =>
        this.inscriptionService.updateInscriptionOnDb(action.data).pipe(
          map(res => InscriptionsActions.updateInscriptionSuccess({data: action.data})),
          catchError(error => of(InscriptionsActions.updateInscriptionFailure({ error })))
        )
      )
    );
  });

  constructor(private actions$: Actions, private inscriptionService: InscriptionsService) {}
}
