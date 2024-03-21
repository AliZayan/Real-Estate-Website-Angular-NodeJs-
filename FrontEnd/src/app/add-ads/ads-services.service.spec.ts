import { TestBed } from '@angular/core/testing';

import { AdsServicesService } from './ads-services.service';

describe('AdsServicesService', () => {
  let service: AdsServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdsServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
