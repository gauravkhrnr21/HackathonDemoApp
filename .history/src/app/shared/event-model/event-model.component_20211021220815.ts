import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-model',
  templateUrl: './event-model.component.html',
  styleUrls: ['./event-model.component.css']
})
export class EventModelComponent implements OnInit {
  display :string = 'block';
 
  constructor(private excelService:ExcelService) {}

  ngOnInit(): void {}

  closeModalDialog(){
    this.display='none'; //set none css after close dialog
  }

  downloadReport(){
    this.excelService.exportAsExcelFile([], 'report'); 
  }
}