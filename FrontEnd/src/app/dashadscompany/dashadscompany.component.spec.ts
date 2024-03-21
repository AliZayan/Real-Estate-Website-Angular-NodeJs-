import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashadscompanyComponent } from './dashadscompany.component';

describe('DashadscompanyComponent', () => {
  let component: DashadscompanyComponent;
  let fixture: ComponentFixture<DashadscompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashadscompanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashadscompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
