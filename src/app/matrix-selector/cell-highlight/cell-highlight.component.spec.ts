import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CellHighlightComponent } from './cell-highlight.component';

describe('CellHighlightComponent', () => {
  let component: CellHighlightComponent;
  let fixture: ComponentFixture<CellHighlightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CellHighlightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellHighlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
