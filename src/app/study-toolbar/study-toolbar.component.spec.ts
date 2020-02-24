import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyToolbarComponent } from './study-toolbar.component';

describe('StudyToolbarComponent', () => {
  let component: StudyToolbarComponent;
  let fixture: ComponentFixture<StudyToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudyToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
