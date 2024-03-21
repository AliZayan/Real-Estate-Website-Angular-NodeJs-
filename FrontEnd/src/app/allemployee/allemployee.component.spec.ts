import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllemployeeComponent } from './allemployee.component';

describe('AllemployeeComponent', () => {
  let component: AllemployeeComponent;
  let fixture: ComponentFixture<AllemployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllemployeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllemployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
