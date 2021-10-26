import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-event-model',
  templateUrl: './event-model.component.html',
  styleUrls: ['./event-model.component.css']
})
export class EventModelComponent implements OnInit {
  display :string = 'block';
  @Input() eventId: number = 0;
 
  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void { 
    let param = {
      eventId : this.eventId
    }
    this.httpClient.get<any>(environment.contextpath+"events/getEvents").subscribe(event =>{ 
      if(event != null){
        this.eventInfo = event;
      }
    },error=>{
     console.log(error)
   });
  }

  closeModal(){
    this.display='none'; //set none css after close dialog
  }
}