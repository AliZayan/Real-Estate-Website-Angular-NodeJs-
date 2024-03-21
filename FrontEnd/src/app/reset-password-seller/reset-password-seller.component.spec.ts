import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordSellerComponent } from './reset-password-seller.component';

describe('ResetPasswordSellerComponent', () => {
  let component: ResetPasswordSellerComponent;
  let fixture: ComponentFixture<ResetPasswordSellerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetPasswordSellerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
