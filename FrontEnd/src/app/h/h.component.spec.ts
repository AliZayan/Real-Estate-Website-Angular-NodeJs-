import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HComponent } from './h.component';

describe('HComponent', () => {
  let component: HComponent;
  let fixture: ComponentFixture<HComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
