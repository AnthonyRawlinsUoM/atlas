import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedMapComponent } from './detailed-map.component';

describe('DetailedMapComponent', () => {
  let component: DetailedMapComponent;
  let fixture: ComponentFixture<DetailedMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailedMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
