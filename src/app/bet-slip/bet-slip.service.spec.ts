import { async, inject, TestBed } from '@angular/core/testing';

import { BetSlipService } from './bet-slip.service';
import { IResult } from '../model/result.model';

describe('BetSlipService', () => {
  let service: BetSlipService;
  let result: IResult;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BetSlipService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it ('should emit the final result of the game', () => {
    result = {
      victory: true,
      text: 'YOU WON',
      winningBall: String(5)
    }
    service.dispatchFinalResultAction(result);
    expect(service.result$).toBeTruthy();
  });

  it('should get the final result of the game', async(inject( [BetSlipService], (betSlipService: BetSlipService) => {
    betSlipService.getResult().subscribe(result => expect(result).toBe(result));
  })));
});
