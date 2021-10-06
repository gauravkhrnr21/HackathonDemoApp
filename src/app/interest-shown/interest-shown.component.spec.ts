import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestShownComponent } from './interest-shown.component';

describe('InterestShownComponent', () => {
  let component: InterestShownComponent;
  let fixture: ComponentFixture<InterestShownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterestShownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterestShownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
