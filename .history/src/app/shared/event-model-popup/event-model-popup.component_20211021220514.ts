import { Component, Input, OnInit } from '@angular/core';
import { ExcelService } from '../service/excel-service';

@Component({
  selector: 'app-event-model-popup',
  templateUrl: '',
  styleUrls: ['./event-model-popup.component.css']
})
export class EventModelPopupComponent implements OnInit {
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
