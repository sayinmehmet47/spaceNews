import { TestBed } from '@angular/core/testing';

import { SpaceflightService } from './spaceflight.service';

describe('SpaceflightService', () => {
  let service: SpaceflightService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpaceflightService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
