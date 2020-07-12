import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostInterpretationComponent } from './cost-interpretation.component';

describe('CostInterpretationComponent', () => {
  let component: CostInterpretationComponent;
  let fixture: ComponentFixture<CostInterpretationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostInterpretationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostInterpretationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
