import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BallSelectorComponent } from './ball-selector.component';
import { BallSelectorService } from './ball-selector.service';
import { IBall } from '../model/ball.model';

describe('BallSelectorComponent', () => {
  let component: BallSelectorComponent;
  let fixture: ComponentFixture<BallSelectorComponent>;
  let spy: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BallSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BallSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init balls array', () => {
    component.initBallsArray();
    expect(component.ballsArray).toBeDefined();
  });

  it('should select ball', () => {
    const service = TestBed.inject(BallSelectorService);
    let ball: IBall = { value: '1', backgroundColor: 'red' };
    spy = spyOn(service, 'dispatchSelectBallAction');
    component.selectBall(ball);
    expect(spy).toHaveBeenCalled();
  });

  it('should clear the game', () => {
    const service = TestBed.inject(BallSelectorService);
    spy = spyOn(service, 'dispatchClearGameAction');
    component.clearSelection();
    expect(spy).toHaveBeenCalled();
  });

});
