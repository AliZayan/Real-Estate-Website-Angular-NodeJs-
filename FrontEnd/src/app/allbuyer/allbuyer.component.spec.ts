import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllbuyerComponent } from './allbuyer.component';

describe('AllbuyerComponent', () => {
  let component: AllbuyerComponent;
  let fixture: ComponentFixture<AllbuyerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllbuyerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllbuyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
