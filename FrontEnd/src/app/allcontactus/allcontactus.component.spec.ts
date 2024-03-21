import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllcontactusComponent } from './allcontactus.component';

describe('AllcontactusComponent', () => {
  let component: AllcontactusComponent;
  let fixture: ComponentFixture<AllcontactusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllcontactusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllcontactusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
