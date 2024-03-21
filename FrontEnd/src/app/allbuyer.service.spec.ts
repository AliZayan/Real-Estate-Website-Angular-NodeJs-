import { TestBed } from '@angular/core/testing';

import { AllbuyerService } from './allbuyer.service';

describe('AllbuyerService', () => {
  let service: AllbuyerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllbuyerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
