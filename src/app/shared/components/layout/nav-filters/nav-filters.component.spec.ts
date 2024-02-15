import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavFiltersComponent } from './nav-filters.component';

describe('NavFiltersComponent', () => {
  let component: NavFiltersComponent;
  let fixture: ComponentFixture<NavFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavFiltersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
