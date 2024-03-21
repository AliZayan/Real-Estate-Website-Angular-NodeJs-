import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordBuyerComponent } from './reset-password-buyer.component';

describe('ResetPasswordBuyerComponent', () => {
  let component: ResetPasswordBuyerComponent;
  let fixture: ComponentFixture<ResetPasswordBuyerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetPasswordBuyerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordBuyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
