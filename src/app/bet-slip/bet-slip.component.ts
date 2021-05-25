import { Component, OnInit } from '@angular/core';
import { BetSlipService } from './bet-slip.service';
import { BallSelectorService } from '../ball-selector/ball-selector.service';
import { IBall } from '../model/ball.model';
import { Subscription } from 'rxjs';
import { IResult } from '../model/result.model';

@Component({
  selector: 'app-bet-slip',
  templateUrl: './bet-slip.component.html',
  styleUrls: ['./bet-slip.component.scss']
})
export class BetSlipComponent implements OnInit {

  ballsSelectedArray: Array<IBall>;
  minimumBetValue: number = 5;
  betValue: number = this.minimumBetValue;
  winPerBet: number = 1.5;
  possibleProfit: number = 0;
  totalProfit: number = 0;
  cleanGame: boolean;
  ballSelectorSubsciption: Subscription;
  gameLaunched: boolean;

  constructor(
    private betSlipService: BetSlipService,
    private ballSelectorService: BallSelectorService
  ) { }

  ngOnInit(): void {
    this.initBallsSelectedArray();
    this.ballSelectorSubsciption = this.ballSelectorService.getBallSelected().subscribe(ball => {
      this.fillBallsArray(ball);
    });

    this.ballSelectorService.getClearGameValue().subscribe(resp => {
      this.initBallsSelectedArray();
      this.betValue = this.minimumBetValue;
      this.possibleProfit = 0;
      this.totalProfit = 0;
      this.gameLaunched = false;
    });
  }
  
  initBallsSelectedArray() {
    this.ballsSelectedArray = [
      {
        value: '',
        backgroundColor: ''
      },
      {
        value: '',
        backgroundColor: ''
      },
      {
        value: '',
        backgroundColor: ''
      },
      {
        value: '',
        backgroundColor: ''
      },
      {
        value: '',
        backgroundColor: ''
      },
      {
        value: '',
        backgroundColor: ''
      },
      {
        value: '',
        backgroundColor: ''
      },
      {
        value: '',
        backgroundColor: ''
      }
    ];
  }

  validateBallsArray(ball: IBall): boolean {
    const existBall = this.ballsSelectedArray.some(item => ball.value === item.value);
    const emptyBall = this.ballsSelectedArray.some(item => item.value === '');
    if (existBall) {
      alert(`The ball number ${ball.value} has already been selected`);
      return false;
    }
    if(!emptyBall && this.ballsSelectedArray[this.ballsSelectedArray.length-1].value) {
      alert(`You can't select more balls`);
      return false;
    }
    return true;
  }

  fillBallsArray(ball: IBall) {
    if (this.validateBallsArray(ball)) {
      for (let i = 0; i < this.ballsSelectedArray.length; i++) {
        if (this.ballsSelectedArray[i].value === '') {
          this.ballsSelectedArray[i] = ball;
          break;
        }
      }
    }
  }

  removeBall(index: number) {
    if (!this.gameLaunched) {
      this.ballsSelectedArray[index] = {value: '', backgroundColor: ''};
    }
  }

  validateBetValue(): boolean {
    if (!this.betValue) {
      alert('The value of the bet is required');
      return false;
    }
    if (this.betValue < 5) {
      alert('The minimum value of the bet is 5€');
      return false;
    }
    return true;
  }

  calculatePossibleProfit() {
    if (this.validateBetValue()) {
      this.possibleProfit = this.betValue * this.winPerBet;
    }
  }

  validatePossibleProfit(): boolean {
    const existBall = this.ballsSelectedArray.some(item => item.value !== '');
    if (!existBall) {
      alert('You must select at least one ball');
      return false;
    }
    if(!this.possibleProfit) {
      alert('The bet value is required');
      return false;
    }
    if (this.possibleProfit < (this.winPerBet * 5)) {
      alert('The minimum value of the bet is 5€');
      return false;
    }
    return true;
  }

  placeBet() {
    if (this.validatePossibleProfit()) {
      this.gameLaunched = true;
      this.minimumBetValue = 5;
      const randomNumber = Math.floor(Math.random() * 10) + 1;
      const wonBet = this.ballsSelectedArray.some(item => String(randomNumber) === item.value);
      wonBet ? this.totalProfit += this.possibleProfit : this.totalProfit = this.totalProfit;
      this.betSlipService.dispatchFinalResultAction({
        victory: wonBet,
        text: wonBet ? 'YOU WON' : 'YOU LOST',
        winningBall: String(randomNumber)
      });
    }
  }

}
