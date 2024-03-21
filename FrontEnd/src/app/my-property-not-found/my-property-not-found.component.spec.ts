import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPropertyNotFoundComponent } from './my-property-not-found.component';

describe('MyPropertyNotFoundComponent', () => {
  let component: MyPropertyNotFoundComponent;
  let fixture: ComponentFixture<MyPropertyNotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyPropertyNotFoundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPropertyNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
