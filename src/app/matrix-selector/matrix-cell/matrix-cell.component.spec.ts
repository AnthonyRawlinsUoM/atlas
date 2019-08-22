import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrixCellComponent } from './matrix-cell.component';

describe('MatrixCellComponent', () => {
  let component: MatrixCellComponent;
  let fixture: ComponentFixture<MatrixCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatrixCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatrixCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
