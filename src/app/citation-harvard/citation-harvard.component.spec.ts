import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CitationHarvardComponent } from './citation-harvard.component';

describe('CitationHarvardComponent', () => {
  let component: CitationHarvardComponent;
  let fixture: ComponentFixture<CitationHarvardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CitationHarvardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitationHarvardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
