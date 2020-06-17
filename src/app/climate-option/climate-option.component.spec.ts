import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClimateOptionComponent } from './climate-option.component';

describe('ClimateOptionComponent', () => {
  let component: ClimateOptionComponent;
  let fixture: ComponentFixture<ClimateOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClimateOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClimateOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
