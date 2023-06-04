import { createFeature, createReducer, on } from '@ngrx/store';
import { InscriptionsActions } from './inscriptions.actions';
import { InscriptionWithAll } from 'src/app/core/models/inscription';

export const inscriptionsFeatureKey = 'inscriptions';

export interface State {
  loading: boolean,
  inscriptions: InscriptionWithAll[],
  error: unknown
}

export const initialState: State = {
  loading: false,
  inscriptions: [],
  error: null
};

export const reducer = createReducer(
  initialState,

  //LOAD INSCRIPTIONS
  on(InscriptionsActions.loadInscriptions, state => {
    return{
      ...state,
      loading: true
    }
  }),

  on(InscriptionsActions.loadInscriptionsSuccess, (state, action) => {
    return{
      ...state,
      loading: false,
      inscriptions: action.data
    }
  }),

  on(InscriptionsActions.loadInscriptionsFailure, (state, action) => {
    return{
      ...state,
      loading: false,
      error: action.error
    }
  }),

  //DELETE INSCRIPTION

  on(InscriptionsActions.deleteInscription, (state) => {
    return {
      ...state,
      loading: true
    }
  }),

  on(InscriptionsActions.deleteInscriptionSuccess, (state, action) => {
    return {
      ...state,
      inscriptions: state.inscriptions.filter((i) => i.id !== action.data),
      loading: false
    };
  }),

  on(InscriptionsActions.deleteInscriptionFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  }),

  //CREATE INSCRIPTION

  on(InscriptionsActions.createInscription, (state) =>{
  return{
    ...state,
    loading: true
    }
  }),

  on(InscriptionsActions.createInscriptionSuccess, (state, action) =>{
    const newInscripcion = action.data;
    return{
      ...state,
      loading: false,
      inscriptions: [...state.inscriptions, newInscripcion]
      }
    }),

    on(InscriptionsActions.createInscriptionFailure, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.error
      }
    }),

  //UPDATE INSCRIPTION

    on(InscriptionsActions.updateInscription, (state) =>{
      return{
        ...state,
        loading: true
        }
      }),
    
      on(InscriptionsActions.updateInscriptionSuccess, (state, action) =>{
        const updatedInscriptions = state.inscriptions.map((inscription) => {
          return action.data.id === inscription.id ? action.data : inscription
        } ) 
        return{
          ...state,
          loading: false,
          inscriptions: updatedInscriptions
          }
        }),
    
        on(InscriptionsActions.createInscriptionFailure, (state, action) => {
          return {
            ...state,
            loading: false,
            error: action.error
          }
        }),
  );

export const inscriptionsFeature = createFeature({
  name: inscriptionsFeatureKey,
  reducer,
});

