import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-model',
  templateUrl: './event-model.component.html',
  styleUrls: ['./event-model.component.css']
})
export class EventModelComponent implements OnInit {
  display :string = 'block';
 
  constructor() {}

  ngOnInit(): void {}

  closeModal(){
    alert("tf");
    this.display='none'; //set none css after close dialog
  }
}