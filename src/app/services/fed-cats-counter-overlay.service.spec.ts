import { TestBed } from '@angular/core/testing';

import { FedCatsCounterOverlayService } from './fed-cats-counter-overlay.service';

describe('FedCatsCounterOverlayService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FedCatsCounterOverlayService = TestBed.get(FedCatsCounterOverlayService);
    expect(service).toBeTruthy();
  });
});
