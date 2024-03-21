import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashallemployeeComponent } from './dashallemployee.component';

describe('DashallemployeeComponent', () => {
  let component: DashallemployeeComponent;
  let fixture: ComponentFixture<DashallemployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashallemployeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashallemployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
