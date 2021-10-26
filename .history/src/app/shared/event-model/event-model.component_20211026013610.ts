import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-model',
  templateUrl: './event-model.component.html',
  styleUrls: ['./event-model.component.css']
})
export class EventModelComponent implements OnInit {
  display :string = 'block';
  @Input() eventId: number;
 
  constructor() {
    alert(this.eventId);
  }

  ngOnInit(): void {}

  closeModal(){
    this.display='none'; //set none css after close dialog
  }
}