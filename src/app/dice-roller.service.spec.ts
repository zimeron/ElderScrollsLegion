import { TestBed } from '@angular/core/testing';

import { DiceRollerService } from './dice-roller.service';

describe('DiceRollerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DiceRollerService = TestBed.get(DiceRollerService);
    expect(service).toBeTruthy();
  });
});
