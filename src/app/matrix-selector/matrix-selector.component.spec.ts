import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrixSelectorComponent } from './matrix-selector.component';

describe('MatrixSelectorComponent', () => {
  let component: MatrixSelectorComponent;
  let fixture: ComponentFixture<MatrixSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatrixSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatrixSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
