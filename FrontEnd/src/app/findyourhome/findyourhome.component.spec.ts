import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindyourhomeComponent } from './findyourhome.component';

describe('FindyourhomeComponent', () => {
  let component: FindyourhomeComponent;
  let fixture: ComponentFixture<FindyourhomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindyourhomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FindyourhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
