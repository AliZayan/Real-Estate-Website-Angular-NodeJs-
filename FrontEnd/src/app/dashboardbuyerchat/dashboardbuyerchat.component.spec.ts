import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardbuyerchatComponent } from './dashboardbuyerchat.component';

describe('DashboardbuyerchatComponent', () => {
  let component: DashboardbuyerchatComponent;
  let fixture: ComponentFixture<DashboardbuyerchatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardbuyerchatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardbuyerchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
