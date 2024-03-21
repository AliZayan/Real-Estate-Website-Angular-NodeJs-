import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertiesforsaleWareHouseComponent } from './propertiesforsale-ware-house.component';

describe('PropertiesforsaleWareHouseComponent', () => {
  let component: PropertiesforsaleWareHouseComponent;
  let fixture: ComponentFixture<PropertiesforsaleWareHouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertiesforsaleWareHouseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertiesforsaleWareHouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
