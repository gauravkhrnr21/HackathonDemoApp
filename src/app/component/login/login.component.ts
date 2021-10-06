import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = true;

  constructor(private formBuilder: FormBuilder,private router: Router ) { 
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  

  ngOnInit(): void {}

  get loginFormControl() {
    return this.loginForm.controls;
  }

  onSubmit(form:FormGroup){
    //if(this.loginForm.valid){
      let data = form.value;
      if(data.username == "gaurav@gmail.com" && data.password == "123"){
        this.router.navigate(['interest']);
      }
    //}
  }

  onReset() {
    this.loginForm.reset();
}
}
