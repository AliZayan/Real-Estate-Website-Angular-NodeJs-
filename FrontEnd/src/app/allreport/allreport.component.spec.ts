import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllreportComponent } from './allreport.component';

describe('AllreportComponent', () => {
  let component: AllreportComponent;
  let fixture: ComponentFixture<AllreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllreportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
