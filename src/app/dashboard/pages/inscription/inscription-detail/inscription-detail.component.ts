import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { InscriptionWithAll } from 'src/app/core/models/inscription';
import { InscriptionsService } from 'src/app/core/services/inscriptions.service';


@Component({
  selector: 'app-inscription-detail',
  templateUrl: './inscription-detail.component.html',
  styleUrls: ['./inscription-detail.component.css']
})
export class InscriptionDetailComponent implements OnDestroy{

  inscription: InscriptionWithAll | undefined
  private destroyed$ = new Subject() 

  constructor(
    private activatedRoute: ActivatedRoute,
    private inscriptionService: InscriptionsService
  ){

    this.inscriptionService.getInscriptionWithAllById(parseInt(activatedRoute.snapshot.params['id']))
    .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (inscription) =>{
          this.inscription = inscription
        }}
      )
  };

  ngOnDestroy(): void {
    this.destroyed$.next(true)
  };
}

