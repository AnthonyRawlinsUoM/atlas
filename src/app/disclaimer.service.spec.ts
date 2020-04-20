import { TestBed } from '@angular/core/testing';

import { DisclaimerService } from './disclaimer.service';

describe('DisclaimerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DisclaimerService = TestBed.get(DisclaimerService);
    expect(service).toBeTruthy();
  });
});
