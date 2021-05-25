import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IResult } from '../model/result.model';

@Injectable({
  providedIn: 'root'
})
export class BetSlipService {

  result$ = new Subject<IResult>();

  constructor() { }

  dispatchFinalResultAction(result: IResult) {
    this.result$.next(result);
  }

  getResult() {
    return this.result$.asObservable();
  }
}
