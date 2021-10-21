import { Component, Input, OnInit } from '@angular/core';
import { ExcelService } from '../service/excel-service';

@Component({
  selector: 'app-model-popup',
  templateUrl: './model-popup.component.html',
  styleUrls: ['./model-popup.component.css']
})
export class ModelPopupComponent implements OnInit {
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
