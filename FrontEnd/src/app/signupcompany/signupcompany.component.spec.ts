import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupcompanyComponent } from './signupcompany.component';

describe('SignupcompanyComponent', () => {
  let component: SignupcompanyComponent;
  let fixture: ComponentFixture<SignupcompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupcompanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupcompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
