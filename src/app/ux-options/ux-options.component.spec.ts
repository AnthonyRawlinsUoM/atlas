import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UxOptionsComponent } from './ux-options.component';

describe('UxOptionsComponent', () => {
  let component: UxOptionsComponent;
  let fixture: ComponentFixture<UxOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UxOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UxOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
