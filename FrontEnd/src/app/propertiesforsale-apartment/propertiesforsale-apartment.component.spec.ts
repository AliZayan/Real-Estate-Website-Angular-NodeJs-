import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertiesforsaleApartmentComponent } from './propertiesforsale-apartment.component';

describe('PropertiesforsaleApartmentComponent', () => {
  let component: PropertiesforsaleApartmentComponent;
  let fixture: ComponentFixture<PropertiesforsaleApartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertiesforsaleApartmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertiesforsaleApartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
