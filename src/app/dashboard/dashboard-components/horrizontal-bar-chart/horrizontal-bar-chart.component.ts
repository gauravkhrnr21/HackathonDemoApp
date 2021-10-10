import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-horrizontal-bar-chart',
  templateUrl: './horrizontal-bar-chart.component.html',
  styleUrls: ['./horrizontal-bar-chart.component.css']
})
export class HorrizontalBarChartComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = ['Poem', 'Study Circle', 'Technology', 'Dance', 'Food', 'Sport'];
  public barChartType: ChartType = 'horizontalBar';
  public barChartLegend = true;
  public barChartPlugins = [];
  
  public barChartData: ChartDataSets[] = [
    { data: [65, 67, 70, 75, 80, 90], label: 'Interested' },
    { data: [50, 48, 47, 49, 44, 40], label: 'Not Interested' }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
