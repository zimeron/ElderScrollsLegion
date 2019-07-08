import { TestBed } from '@angular/core/testing';

import { CharacterClassService } from './character-class-service.service';

describe('CharacterClassServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CharacterClassService = TestBed.get(CharacterClassService);
    expect(service).toBeTruthy();
  });
});
