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

  constructor(private formBuilder: FormBuilder) { 
    this.feedbackForm = this.formBuilder.group({
      feedback: ['', []],
      comment: ['', [Validators.required, Validators.minLength(50)]],
    });
  }

  onSubmit(form:FormGroup){
    alert("test")
    let formData = form.value;
    console.log(formData);
  }

  clear(){
    this.feedbackForm.reset();
  }

  ngOnInit(): void {
  }

}
