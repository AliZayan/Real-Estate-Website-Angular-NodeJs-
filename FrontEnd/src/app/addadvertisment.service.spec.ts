import { TestBed } from '@angular/core/testing';

import { AddadvertismentService } from './addadvertisment.service';

describe('AddadvertismentService', () => {
  let service: AddadvertismentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddadvertismentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
