import { TestBed } from '@angular/core/testing';

import { BackgroundsService } from './backgrounds.service';

describe('BackgroundsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BackgroundsService = TestBed.get(BackgroundsService);
    expect(service).toBeTruthy();
  });
});
