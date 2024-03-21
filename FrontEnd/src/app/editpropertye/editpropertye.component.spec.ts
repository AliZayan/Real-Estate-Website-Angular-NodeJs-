import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditpropertyeComponent } from './editpropertye.component';

describe('EditpropertyeComponent', () => {
  let component: EditpropertyeComponent;
  let fixture: ComponentFixture<EditpropertyeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditpropertyeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditpropertyeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
