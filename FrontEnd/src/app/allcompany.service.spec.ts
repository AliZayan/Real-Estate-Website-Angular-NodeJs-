import { TestBed } from '@angular/core/testing';

import { AllcompanyService } from './allcompany.service';

describe('AllcompanyService', () => {
  let service: AllcompanyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllcompanyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
