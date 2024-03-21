import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashEmployeeMassageComponent } from './dash-employee-massage.component';

describe('DashEmployeeMassageComponent', () => {
  let component: DashEmployeeMassageComponent;
  let fixture: ComponentFixture<DashEmployeeMassageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashEmployeeMassageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashEmployeeMassageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
