import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCompleteComponent } from './home-complete.component';

describe('HomeCompleteComponent', () => {
  let component: HomeCompleteComponent;
  let fixture: ComponentFixture<HomeCompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeCompleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
