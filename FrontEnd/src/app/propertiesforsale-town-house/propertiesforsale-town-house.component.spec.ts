import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertiesforsaleTownHouseComponent } from './propertiesforsale-town-house.component';

describe('PropertiesforsaleTownHouseComponent', () => {
  let component: PropertiesforsaleTownHouseComponent;
  let fixture: ComponentFixture<PropertiesforsaleTownHouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertiesforsaleTownHouseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertiesforsaleTownHouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
