import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertiesforsaleStoreComponent } from './propertiesforsale-store.component';

describe('PropertiesforsaleStoreComponent', () => {
  let component: PropertiesforsaleStoreComponent;
  let fixture: ComponentFixture<PropertiesforsaleStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertiesforsaleStoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertiesforsaleStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
