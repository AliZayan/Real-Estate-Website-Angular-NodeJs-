import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashAllSellerComponent } from './dash-all-seller.component';

describe('DashAllSellerComponent', () => {
  let component: DashAllSellerComponent;
  let fixture: ComponentFixture<DashAllSellerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashAllSellerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashAllSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
