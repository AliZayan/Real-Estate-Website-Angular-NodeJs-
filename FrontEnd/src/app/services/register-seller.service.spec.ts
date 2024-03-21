import { TestBed } from '@angular/core/testing';

import { RegisterSellerService } from './register-seller.service';

describe('RegisterSellerService', () => {
  let service: RegisterSellerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterSellerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
