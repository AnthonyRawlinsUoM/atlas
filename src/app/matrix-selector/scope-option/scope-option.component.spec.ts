import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScopeOptionComponent } from './scope-option.component';

describe('ScopeOptionComponent', () => {
  let component: ScopeOptionComponent;
  let fixture: ComponentFixture<ScopeOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScopeOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScopeOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
