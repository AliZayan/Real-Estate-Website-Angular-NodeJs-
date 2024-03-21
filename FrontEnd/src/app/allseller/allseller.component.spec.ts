import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllsellerComponent } from './allseller.component';

describe('AllsellerComponent', () => {
  let component: AllsellerComponent;
  let fixture: ComponentFixture<AllsellerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllsellerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllsellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
