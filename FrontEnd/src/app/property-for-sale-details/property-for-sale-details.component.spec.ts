import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyForSaleDetailsComponent } from './property-for-sale-details.component';

describe('PropertyForSaleDetailsComponent', () => {
  let component: PropertyForSaleDetailsComponent;
  let fixture: ComponentFixture<PropertyForSaleDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyForSaleDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyForSaleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
