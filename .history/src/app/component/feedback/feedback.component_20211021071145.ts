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
    let formData = form.value;
    if(formData != null){
      this.httpClient.get("").subscribe(resp=>{
        console.log(resp);
      });
    }
    console.log(formData);
  }

  clear(){
    this.feedbackForm.reset();
  }

  ngOnInit(): void {
  }
}
