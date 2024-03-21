import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashEmployeeAllAdsComponent } from './dash-employee-all-ads.component';

describe('DashEmployeeAllAdsComponent', () => {
  let component: DashEmployeeAllAdsComponent;
  let fixture: ComponentFixture<DashEmployeeAllAdsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashEmployeeAllAdsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashEmployeeAllAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
