import { TestBed } from '@angular/core/testing';

import { BayesNetOuputsService } from './bayes-net-ouputs.service';

describe('BayesNetOuputsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BayesNetOuputsService = TestBed.get(BayesNetOuputsService);
    expect(service).toBeTruthy();
  });
});
