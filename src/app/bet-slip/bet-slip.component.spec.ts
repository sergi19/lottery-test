import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IBall } from '../model/ball.model';

import { BetSlipComponent } from './bet-slip.component';
import { BetSlipService } from './bet-slip.service';

describe('BetSlipComponent', () => {
  let component: BetSlipComponent;
  let fixture: ComponentFixture<BetSlipComponent>;
  let ball: IBall;
  let spy: any;

  beforeEach(async(() => {
    ball = { value: '1', backgroundColor: 'red' };
    TestBed.configureTestingModule({
      declarations: [ BetSlipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BetSlipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init balls selected array', () => {
    component.initBallsSelectedArray();
    expect(component.ballsSelectedArray).toBeDefined();
  });

  it('should remove a ball from a especific position of array', () => {
    component.removeBall(0);
    expect(component.ballsSelectedArray).toBeDefined();
  });

  //--------------------BALLS ARRAY VALIDATION--------------------
  it('should validate if a ball could be added to array', () => {
    expect(component.validateBallsArray(ball)).toBeTrue();
  });

  it('should validate if a ball exist within the array', () => {
    component.ballsSelectedArray = [{value: '1', backgroundColor: 'red'}];
    expect(component.validateBallsArray(ball)).toBeFalse();
  });

  it('should validate if a the balls array is full', () => {
    component.ballsSelectedArray = [{value: '2', backgroundColor: 'yellow'}];
    expect(component.validateBallsArray(ball)).toBeFalse();
  });

  it('should fill balls selected array', () => {
    let ball = {value: '1', backgroundColor: 'red'};
    component.fillBallsArray(ball);
    expect(component.ballsSelectedArray).toBeDefined();
  });

  //------------------------BET VALIDATION-----------------------
  it('should validate if the value of the bet is correct', () => {
    expect(component.validateBetValue()).toBeTrue();
  });

  it('should validate if the value of bet is undefined or null', () => {
    component.betValue = undefined || null;
    expect(component.validateBetValue()).toBeFalse();
  });

  it('should validate if the value of bet is less than 5', () => {
    component.betValue = 4;
    expect(component.validateBetValue()).toBeFalse();
  });

  it('should calculate the possible profit', () => {
    component.calculatePossibleProfit();
    expect(component.possibleProfit).toBeGreaterThan(0);
  });

  //----------------------PROFIT VALIDATION-----------------------
  it('should validate if the value of the possible profit is correct and there is at least one ball selected', () => {
    component.ballsSelectedArray = [{value: '1', backgroundColor: 'red'}];
    component.minimumBetValue = 5;
    component.winPerBet = 1.5;
    component.possibleProfit = 7.5;
    expect(component.validatePossibleProfit()).toBeTrue();
  });

  it('should validate if the value of the possible profit is undefined', () => {
    component.possibleProfit = undefined || null;
    expect(component.validatePossibleProfit()).toBeFalse();
  });

  it('should validate if the balls array is empty', () => {
    component.ballsSelectedArray = [{value: '', backgroundColor: ''}];
    expect(component.validatePossibleProfit()).toBeFalse();
  });

  it('should validate if the value of the profit is less than 5 * 1.5', () => {
    component.winPerBet = 1.5;
    component.minimumBetValue = 5;
    component.totalProfit = 0;
    expect(component.validatePossibleProfit()).toBeFalse();
  });

  it('should emit a result of the bet game', () => {
    const service = TestBed.inject(BetSlipService);
    component.ballsSelectedArray = [{value: '1', backgroundColor: 'red'}];
    component.minimumBetValue = 5;
    component.winPerBet = 1.5;
    component.possibleProfit = 7.5;
    spy = spyOn(service, 'dispatchFinalResultAction');
    component.placeBet();
    expect(spy).toHaveBeenCalled();
  });

});
