import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';

interface Time {
  hours: number,
  minutes: number,
  seconds: number
}

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  private _clock$ = new BehaviorSubject<Time>(this.currentTime);

  constructor() {
    setInterval(()=>{
      this._clock$.next(this.currentTime)
    }, 1000)
   }

  get clock(): Observable<string>{
    return this._clock$.asObservable()
      .pipe(
         map((time)=>{
        return `${time.hours}:${time.minutes}:${time.seconds}`;
      })
    );
  }

  get currentTime() : Time {
    const now = new Date()

    return {
      hours: now.getHours(),
      minutes: now.getMinutes(),
      seconds: now.getSeconds(),
    }
  }
}
