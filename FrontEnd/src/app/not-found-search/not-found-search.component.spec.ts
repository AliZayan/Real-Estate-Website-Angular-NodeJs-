import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotFoundSearchComponent } from './not-found-search.component';

describe('NotFoundSearchComponent', () => {
  let component: NotFoundSearchComponent;
  let fixture: ComponentFixture<NotFoundSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotFoundSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotFoundSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
