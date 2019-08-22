import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyAreaWindowComponent } from './study-area-window.component';

describe('StudyAreaWindowComponent', () => {
  let component: StudyAreaWindowComponent;
  let fixture: ComponentFixture<StudyAreaWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudyAreaWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyAreaWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
