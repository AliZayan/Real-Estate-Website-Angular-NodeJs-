import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavNotFoundComponent } from './fav-not-found.component';

describe('FavNotFoundComponent', () => {
  let component: FavNotFoundComponent;
  let fixture: ComponentFixture<FavNotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavNotFoundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
