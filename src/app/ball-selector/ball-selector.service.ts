import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IBall } from '../model/ball.model';

@Injectable({
  providedIn: 'root'
})
export class BallSelectorService {

  ballSelected$ = new Subject<IBall>();
  clearGame$ = new Subject<boolean>();

  constructor() { }

  dispatchSelectBallAction(ballSelected: IBall) {
    this.ballSelected$.next(ballSelected);
  }

  dispatchClearGameAction() {
    this.clearGame$.next(true);
  }

  getBallSelected() {
    return this.ballSelected$.asObservable();
  }

  getClearGameValue() {
    return this.clearGame$.asObservable();
  }

}
