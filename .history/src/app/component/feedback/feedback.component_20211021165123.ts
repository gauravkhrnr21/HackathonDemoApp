import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenStorageService } from 'src/app/shared/service/token-storage.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  feedbackForm: FormGroup;
  submitted:boolean = true;
  user:any;

  constructor(private formBuilder: FormBuilder,private httpClient: HttpClient,private storageService :TokenStorageService) { 
    this.feedbackForm = this.formBuilder.group({
      rating: ['', [Validators.required]],
      comment: ['', [Validators.required, Validators.minLength(5)]],
    });
    if(this.storageService.getUser() != null){
      this.user = this.storageService.getUser();
    }
  }

  onSubmit(form:FormGroup){
    let feedBack = form.value;
    feedBack['userId'] = this.user.userId;
    if(feedBack != null){
      this.httpClient.post<any>("http://localhost:8080/feedback/addFeedback",feedBack).subscribe(resp=>{
        this.feedbackForm.reset();
      });
    }
  }

  clear(){
    this.feedbackForm.reset();
  }

  ngOnInit(): void {}
}
