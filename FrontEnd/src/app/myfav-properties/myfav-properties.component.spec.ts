import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyfavPropertiesComponent } from './myfav-properties.component';

describe('MyfavPropertiesComponent', () => {
  let component: MyfavPropertiesComponent;
  let fixture: ComponentFixture<MyfavPropertiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyfavPropertiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyfavPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
