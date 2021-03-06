import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css']
})
export class BarchartComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = ['Poem', 'Study Circle', 'Technology', 'Dance', 'Food', 'Sport'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  
  public barChartData: ChartDataSets[] = [
    { data: [65, 67, 70, 75, 80, 90], label: 'Interested',backgroundColor:'#002e87',hoverBackgroundColor:'#002e87' },
    { data: [50, 48, 47, 49, 44, 40], label: 'Not Interested',backgroundColor:'#009ddf',hoverBackgroundColor:'#009ddf' }
  ];
  constructor(private excelService:ExcelService) { }

  ngOnInit(): void {
  }

  downloadReport(){
    alert("download");
  }
}
