import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetPasswordCompanyComponent } from './forget-password-company.component';

describe('ForgetPasswordCompanyComponent', () => {
  let component: ForgetPasswordCompanyComponent;
  let fixture: ComponentFixture<ForgetPasswordCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgetPasswordCompanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgetPasswordCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
