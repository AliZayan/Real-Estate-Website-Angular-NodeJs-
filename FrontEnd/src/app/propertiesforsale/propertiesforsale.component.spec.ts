import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PROPERTIESFORSALEComponent } from './propertiesforsale.component';

describe('PROPERTIESFORSALEComponent', () => {
  let component: PROPERTIESFORSALEComponent;
  let fixture: ComponentFixture<PROPERTIESFORSALEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PROPERTIESFORSALEComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PROPERTIESFORSALEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
