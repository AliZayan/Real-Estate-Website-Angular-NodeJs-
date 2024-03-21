import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfMyPropertiesComponent } from './list-of-my-properties.component';

describe('ListOfMyPropertiesComponent', () => {
  let component: ListOfMyPropertiesComponent;
  let fixture: ComponentFixture<ListOfMyPropertiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfMyPropertiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfMyPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
