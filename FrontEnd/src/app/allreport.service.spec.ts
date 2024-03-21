import { TestBed } from '@angular/core/testing';

import { AllreportService } from './allreport.service';

describe('AllreportService', () => {
  let service: AllreportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllreportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
