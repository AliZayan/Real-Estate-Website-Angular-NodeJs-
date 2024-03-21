import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashEmployeeContactusComponent } from './dash-employee-contactus.component';

describe('DashEmployeeContactusComponent', () => {
  let component: DashEmployeeContactusComponent;
  let fixture: ComponentFixture<DashEmployeeContactusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashEmployeeContactusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashEmployeeContactusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
