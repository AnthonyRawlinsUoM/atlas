import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyAreasComponent } from './study-areas.component';

describe('StudyAreasComponent', () => {
  let component: StudyAreasComponent;
  let fixture: ComponentFixture<StudyAreasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudyAreasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyAreasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
