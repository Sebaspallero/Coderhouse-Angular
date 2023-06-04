import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InscriptionComponent } from './inscription.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormErrorHelpersModule } from 'src/app/shared/components/form-error-helpers/form-error-helpers.module';
import { MatIconModule } from '@angular/material/icon';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { DirectivesModule } from 'src/app/shared/directives/directives.module';
import { InscriptionDetailModule } from './inscription-detail/inscription-detail.module';
import { InscriptionsRoutingModule } from './inscriptions-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { InscriptionsEffects } from './store/inscriptions.effects';
import { StoreModule } from '@ngrx/store';
import { inscriptionsFeature } from './store/inscriptions.reducer';



@NgModule({
  declarations: [
    InscriptionComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormErrorHelpersModule,
    MatIconModule,
    PipesModule,
    DirectivesModule,
    InscriptionDetailModule,
    InscriptionsRoutingModule,
    StoreModule.forFeature(inscriptionsFeature),
    EffectsModule.forFeature([InscriptionsEffects])
  ],
  exports:[
    InscriptionComponent
  ]
})
export class InscriptionModule { }
