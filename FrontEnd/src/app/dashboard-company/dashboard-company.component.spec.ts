import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCompanyComponent } from './dashboard-company.component';

describe('DashboardCompanyComponent', () => {
  let component: DashboardCompanyComponent;
  let fixture: ComponentFixture<DashboardCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardCompanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
