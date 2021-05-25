import { Component, OnInit } from '@angular/core';
import { IBall } from '../model/ball.model';
import { BallSelectorService } from './ball-selector.service';
import { BetSlipService } from '../bet-slip/bet-slip.service';
import { IResult } from '../model/result.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ball-selector',
  templateUrl: './ball-selector.component.html',
  styleUrls: ['./ball-selector.component.scss']
})
export class BallSelectorComponent implements OnInit {

  ballsArray: Array<IBall>;
  finalResult: IResult;
  winningBall: IBall;
  index: number = 0;
  betSlipSubscription: Subscription;

  constructor(
    private ballSelectorService: BallSelectorService,
    private betSlipService: BetSlipService
  ) { }

  ngOnInit(): void {
    this.initBallsArray();
    this.betSlipSubscription = this.betSlipService.getResult().subscribe(result => {
      this.winningBall = this.ballsArray.filter(obj => obj.value === result.winningBall)[0];
      this.finalResult = {
        victory: result.victory,
        text: result.text
      }
    });
  }

  initBallsArray() {
    this.ballsArray = [
      {
        value: '1',
        backgroundColor: '#d1554e'
      },
      {
        value: '2',
        backgroundColor: '#fff8e3'
      },
      {
        value: '3',
        backgroundColor: '#4aa668'
      },
      {
        value: '4',
        backgroundColor: '#faebec'
      },
      {
        value: '5',
        backgroundColor: '#fdc935'
      },
      {
        value: '6',
        backgroundColor: '#faebec'
      },
      {
        value: '7',
        backgroundColor: '#d1554e'
      },
      {
        value: '8',
        backgroundColor: '#fff8e3'
      },
      {
        value: '9',
        backgroundColor: '#4aa668'
      },
      {
        value: '10',
        backgroundColor: '#faebec'
      }
    ];
  }

  selectBall(ballSelected: IBall) {
    this.ballSelectorService.dispatchSelectBallAction(ballSelected);
  }

  clearSelection() {
    this.finalResult = null;
    this.ballSelectorService.dispatchClearGameAction();
  }

}
