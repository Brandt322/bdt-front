import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalentContentComponent } from './talent-content.component';

describe('TalentContentComponent', () => {
  let component: TalentContentComponent;
  let fixture: ComponentFixture<TalentContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TalentContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TalentContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
