import { TestBed } from '@angular/core/testing';

import { BirthsignService } from './birthsign.service';

describe('BirthsignService', () => {
  let service: BirthsignService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BirthsignService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
