import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupsellerComponent } from './signupseller.component';

describe('SignupsellerComponent', () => {
  let component: SignupsellerComponent;
  let fixture: ComponentFixture<SignupsellerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupsellerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupsellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
