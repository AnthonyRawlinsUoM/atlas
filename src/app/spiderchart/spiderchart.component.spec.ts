import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpiderchartComponent } from './spiderchart.component';

describe('SpiderchartComponent', () => {
  let component: SpiderchartComponent;
  let fixture: ComponentFixture<SpiderchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpiderchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpiderchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
