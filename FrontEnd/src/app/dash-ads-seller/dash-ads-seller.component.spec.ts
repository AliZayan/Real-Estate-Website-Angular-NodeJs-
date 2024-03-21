import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashAdsSellerComponent } from './dash-ads-seller.component';

describe('DashAdsSellerComponent', () => {
  let component: DashAdsSellerComponent;
  let fixture: ComponentFixture<DashAdsSellerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashAdsSellerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashAdsSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
