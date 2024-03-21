import { TestBed } from '@angular/core/testing';

import { AddAdvertisementService } from './add-advertisement.service';

describe('AddAdvertisementService', () => {
  let service: AddAdvertisementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddAdvertisementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
