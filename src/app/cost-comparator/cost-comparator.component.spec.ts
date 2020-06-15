import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostComparatorComponent } from './cost-comparator.component';

describe('CostComparatorComponent', () => {
  let component: CostComparatorComponent;
  let fixture: ComponentFixture<CostComparatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostComparatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostComparatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
