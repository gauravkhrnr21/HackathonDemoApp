import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { ExcelService } from 'src/app/shared/service/excel-service';

@Component({
  selector: 'app-horrizontal-bar-chart',
  templateUrl: './horrizontal-bar-chart.component.html',
  styleUrls: ['./horrizontal-bar-chart.component.css']
})
export class HorrizontalBarChartComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = ['Cricket', 'Badminton', 'Chess', 'Yoga','Football','Tenis','Trekking','Carrom','Tabl Tennis','Workout','Boating'];
  public barChartType: ChartType = 'horizontalBar';
  public chartName:string = "Sport Sub-Interests Chart" 
  public barChartLegend = true;
  public barChartPlugins = [];
  
  public barChartData: ChartDataSets[] = [
    { data: [75,65, 67, 70, 75, 56,23,54,36,87,23], label: 'Interested',backgroundColor:'#002e87',hoverBackgroundColor:'#002e87' }
  ];
  constructor(private excelService: ExcelService) {  }

  downloadReport(){
    this.excelService.exportAsExcelFile([], 'report'); 
  }

  ngOnInit(): void {
  }
}
