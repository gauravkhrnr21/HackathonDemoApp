import { Component, OnInit } from '@angular/core';
import { SearchGroupService } from 'src/app/shared/service/search-group.service';

@Component({
  selector: 'app-manage-interest',
  templateUrl: './manage-interest.component.html',
  styleUrls: ['./manage-interest.component.css']
})

export class ManageInterestComponent implements OnInit {
  POSTS: any;
  loginForm: FormGroup;
  submitted:boolean = true;
  page = 1;
  count = 0;
  tableSize = 7;
  tableSizes = [3, 6, 9, 12];
  interestData :any = [ {name:"Sachin Patil",department:"Technology",location:"Pune",interest:"cricket"},
                        {name:"Manoj Kumar",department:"Adminstrator",location:"Pune",interest:"cricket"},
                        {name:"John Smith",department:"HR",location:"US",interest:"cricket"},
                        {name:"Alex Oliver",department:"Networking",location:"UK",interest:"cricket"},
                        {name:"Prakash Patil",department:"Technology",location:"Delhi",interest:"cricket"},
                        {name:"Kevin Siddle",department:"Security",location:"Austrelia",interest:"cricket"},
                        {name:"Ashish Sharma",department:"HR",location:"Delhi",interest:"cricket"},
                        {name:"Kartik Shinde",department:"Technology",location:"Mumbai",interest:"cricket"}];
  
  constructor() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  ngOnInit(): void {
    this.fetchPosts();
  }  

  fetchPosts(): void {
    setTimeout(()=>{
      this.POSTS = this.interestData;
    },1000);
  }

  onTableDataChange(event:any){
    this.page = event;
    this.fetchPosts();
  }  

  onTableSizeChange(event:any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.fetchPosts();
  }  
}
  


