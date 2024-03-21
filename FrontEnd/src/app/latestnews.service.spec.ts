import { TestBed } from '@angular/core/testing';

import { LatestnewsService } from './latestnews.service';

describe('LatestnewsService', () => {
  let service: LatestnewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LatestnewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
