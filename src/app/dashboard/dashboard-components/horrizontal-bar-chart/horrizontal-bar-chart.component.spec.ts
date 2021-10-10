import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorrizontalBarChartComponent } from './horrizontal-bar-chart.component';

describe('HorrizontalBarChartComponent', () => {
  let component: HorrizontalBarChartComponent;
  let fixture: ComponentFixture<HorrizontalBarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HorrizontalBarChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HorrizontalBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
