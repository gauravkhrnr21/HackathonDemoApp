import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  feedbackForm: FormGroup;
  submitted:boolean = true;

  constructor(private formBuilder: FormBuilder,private httpClient: HttpClient) { 
    this.feedbackForm = this.formBuilder.group({
      feedback: ['', [Validators.required]],
      comment: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  onSubmit(form:FormGroup){
    let feedBack = form.value;
    console.log(feedBack);
    if(feedBack != null){
      alert("test");
      this.httpClient.post<any>("http://localhost:8080/feedback/addFeedback",feedBack).subscribe(resp=>{
        this.feedbackForm.reset();
      });
    }
  }

  clear(){
    this.feedbackForm.reset();
  }

  ngOnInit(): void {
  }
}
