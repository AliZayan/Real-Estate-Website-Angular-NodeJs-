import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashAllBuyerComponent } from './dash-all-buyer.component';

describe('DashAllBuyerComponent', () => {
  let component: DashAllBuyerComponent;
  let fixture: ComponentFixture<DashAllBuyerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashAllBuyerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashAllBuyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
