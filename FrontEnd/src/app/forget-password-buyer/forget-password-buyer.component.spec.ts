import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetPasswordBuyerComponent } from './forget-password-buyer.component';

describe('ForgetPasswordBuyerComponent', () => {
  let component: ForgetPasswordBuyerComponent;
  let fixture: ComponentFixture<ForgetPasswordBuyerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgetPasswordBuyerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgetPasswordBuyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
