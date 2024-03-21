import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashAllCompanyComponent } from './dash-all-company.component';

describe('DashAllCompanyComponent', () => {
  let component: DashAllCompanyComponent;
  let fixture: ComponentFixture<DashAllCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashAllCompanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashAllCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
