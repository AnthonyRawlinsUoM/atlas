import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrixHeaderCellComponent } from './matrix-header-cell.component';

describe('MatrixHeaderCellComponent', () => {
  let component: MatrixHeaderCellComponent;
  let fixture: ComponentFixture<MatrixHeaderCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatrixHeaderCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatrixHeaderCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
