import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomecarsoulComponent } from './homecarsoul.component';

describe('HomecarsoulComponent', () => {
  let component: HomecarsoulComponent;
  let fixture: ComponentFixture<HomecarsoulComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomecarsoulComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomecarsoulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
