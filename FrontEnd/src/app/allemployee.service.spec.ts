import { TestBed } from '@angular/core/testing';

import { AllemployeeService } from './allemployee.service';

describe('AllemployeeService', () => {
  let service: AllemployeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllemployeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
