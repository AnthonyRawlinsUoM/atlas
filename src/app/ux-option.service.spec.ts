import { TestBed } from '@angular/core/testing';

import { UxOptionService } from './ux-option.service';

describe('UxOptionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UxOptionService = TestBed.get(UxOptionService);
    expect(service).toBeTruthy();
  });
});
