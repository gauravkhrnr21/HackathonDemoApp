import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json',"Access-Control-Allow-Origin": "*"})
};

const AUTH_API = 'http://localhost:8080/api/auth/';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit{
  userData: any;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private http: HttpClient,private tokenStorage: TokenStorageService) {}

  ngOnInit(){
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  signIn(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      username,
      password
    }, httpOptions);
  }

  isUserLoggedIn(): boolean {
    return this.isLoggedIn;
  }

  saveUser(user:any){
    this.tokenStorage.saveUser(user);
  }

  saveToken(token:any){
    this.tokenStorage.saveToken(token);
  }

  getToken(){
    return this.tokenStorage.getToken();
  }

  setIsLoggedIn(isLoggedIn:boolean){
    this.isLoggedIn = isLoggedIn;
  }

  setIsLoginFailed(isLoginFailed:boolean){
    this.isLoginFailed = isLoginFailed;
  }

  setErrorMsg(msg:string){
    this.errorMessage;
  }

  getRoles(){
    return this.roles;
  }

  setRoles(roles:any){
    this.roles = roles;
  }

  clearSession(){
    this.tokenStorage.signOut();
  }
  
  SignOut() {
    return this.http.get(AUTH_API + 'signout');
  }
}