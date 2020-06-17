import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostOptionComponent } from './cost-option.component';

describe('CostOptionComponent', () => {
  let component: CostOptionComponent;
  let fixture: ComponentFixture<CostOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
