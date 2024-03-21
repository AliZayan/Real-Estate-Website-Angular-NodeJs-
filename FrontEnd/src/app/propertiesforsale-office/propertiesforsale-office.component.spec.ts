import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertiesforsaleOfficeComponent } from './propertiesforsale-office.component';

describe('PropertiesforsaleOfficeComponent', () => {
  let component: PropertiesforsaleOfficeComponent;
  let fixture: ComponentFixture<PropertiesforsaleOfficeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertiesforsaleOfficeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertiesforsaleOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
