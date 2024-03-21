import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertiesforsaleVillaComponent } from './propertiesforsale-villa.component';

describe('PropertiesforsaleVillaComponent', () => {
  let component: PropertiesforsaleVillaComponent;
  let fixture: ComponentFixture<PropertiesforsaleVillaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertiesforsaleVillaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertiesforsaleVillaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
