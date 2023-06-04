import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CreateInscriptionData, Inscription, InscriptionWithAll } from 'src/app/core/models/inscription';

export const InscriptionsActions = createActionGroup({
  source: 'Inscriptions',
  events: {
    'Load Inscriptions': emptyProps(),
    'Load Inscriptions Success': props<{ data: InscriptionWithAll[] }>(),
    'Load Inscriptions Failure': props<{ error: unknown }>(),

    'Delete Inscription': props<{ id: number }>(),
    'Delete Inscription Success': props<{ data: number }>(),
    'Delete Inscription Failure': props<{ error: unknown }>(),

    'Create Inscription': props<{ data: CreateInscriptionData}>(),
    'Create Inscription Success': props<{ data: InscriptionWithAll }>(),
    'Create Inscription Failure': props<{ error: unknown }>(),

    'Update Inscription': props<{ data: Inscription}>(),
    'Update Inscription Success': props<{ data: Inscription }>(),
    'Update Inscription Failure': props<{ error: unknown }>(),

  }
});
