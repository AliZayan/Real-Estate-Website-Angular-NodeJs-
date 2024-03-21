import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashEmployeeReportComponent } from './dash-employee-report.component';

describe('DashEmployeeReportComponent', () => {
  let component: DashEmployeeReportComponent;
  let fixture: ComponentFixture<DashEmployeeReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashEmployeeReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashEmployeeReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
