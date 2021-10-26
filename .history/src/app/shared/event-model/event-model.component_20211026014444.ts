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
  event:any;
 
  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void { 
    let param = {
      eventId : this.eventId
    }
    this.httpClient.post<any>(environment.contextpath+"events/getEventById",param).subscribe(event =>{ 
      console.log(event);
      if(event != null){
        this.event = event;
      }
    },error=>{
     console.log(error)
   });
  }

  closeModal(){
    this.display='none'; //set none css after close dialog
  }
}