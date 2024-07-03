import { TestBed } from '@angular/core/testing';

import { GhfetchService } from './ghfetch.service';

describe('GhfetchService', () => {
  let service: GhfetchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GhfetchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
