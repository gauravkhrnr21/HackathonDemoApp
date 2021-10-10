import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-model-popup',
  templateUrl: './model-popup.component.html',
  styleUrls: ['./model-popup.component.css']
})
export class ModelPopupComponent implements OnInit {
  display :string = 'block';
 
  constructor() {}

  ngOnInit(): void {}

  closeModalDialog(){
    this.display='none'; //set none css after close dialog
  }
}
