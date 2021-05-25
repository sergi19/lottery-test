import { async, inject, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { IBall } from '../model/ball.model';

import { BallSelectorService } from './ball-selector.service';

describe('BallSelectorService', () => {
  let service: BallSelectorService;
  let ball: IBall;

  beforeEach(() => {
    TestBed.configureTestingModule({providers: [BallSelectorService]});
    service = TestBed.inject(BallSelectorService);
    ball = { value: '1', backgroundColor: 'red' };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it ('should select a ball', () => {
    service.dispatchSelectBallAction(ball);
    expect(service.ballSelected$).toBeTruthy();
  });

  it ('should clear the game', () => {
    service.dispatchClearGameAction();
    expect(service.clearGame$).toBeTruthy();
  });

  it('should get the ball selected', async(inject( [BallSelectorService], (ballSelectorService: BallSelectorService) => {
    ballSelectorService.getBallSelected().subscribe(result => expect(result).toBe(ball));
  })));

  it('should verify if the game must be cleaned', async(inject( [BallSelectorService], (ballSelectorService: BallSelectorService) => {
    ballSelectorService.getClearGameValue().subscribe(result => expect(result).toBeTrue());
  })));

});
