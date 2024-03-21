import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPropertyEmployeeComponent } from './all-property-employee.component';

describe('AllPropertyEmployeeComponent', () => {
  let component: AllPropertyEmployeeComponent;
  let fixture: ComponentFixture<AllPropertyEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllPropertyEmployeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllPropertyEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
