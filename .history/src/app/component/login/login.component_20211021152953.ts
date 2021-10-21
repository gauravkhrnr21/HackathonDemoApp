import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted:boolean = true;
  //loginInvalid :boolean = false;
  warnmsg:string = "";

  constructor(private formBuilder: FormBuilder,private router: Router,private authService:AuthService ) { 
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
     // password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  ngOnInit(): void {}

  get loginFormControl() {
    return this.loginForm.controls;
  }

  onSubmit(form:FormGroup){
    let formData = form.value;
    if(formData != null){
      this.router.navigateByUrl("/interest");
      /*this.authService.signIn(formData.username,formData.password).subscribe(resp => {
       console.log(resp)
        if(resp != null){
          this.authService.saveToken(resp.accessToken);
          this.authService.saveUser(resp);
          this.authService.setIsLoginFailed(false);
          this.authService.setIsLoggedIn(true);
          this.authService.setRoles(resp.roles);
          this.router.navigateByUrl("/interest");          
        }else{
         // this.loginInvalid = true;
          this.warnmsg = "Something went wrong";
        }
      },err => {
        this.authService.setErrorMsg(err.error.message);
        this.authService.setIsLoginFailed(false);
        //this.loginInvalid = true;
        this.warnmsg = "Incorrect username and password";
      });*/     
    }
  }

  onReset() {
    this.loginForm.reset();
  }
}
