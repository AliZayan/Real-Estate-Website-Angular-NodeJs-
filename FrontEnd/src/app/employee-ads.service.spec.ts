import { TestBed } from '@angular/core/testing';

import { EmployeeAdsService } from './employee-ads.service';

describe('EmployeeAdsService', () => {
  let service: EmployeeAdsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeAdsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
