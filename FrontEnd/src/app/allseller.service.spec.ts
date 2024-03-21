import { TestBed } from '@angular/core/testing';

import { AllsellerService } from './allseller.service';

describe('AllsellerService', () => {
  let service: AllsellerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllsellerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
