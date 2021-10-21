import { Component, AfterViewInit } from '@angular/core';
import { SearchGroupService } from '../shared/service/search-group.service';

@Component({
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements AfterViewInit {
  //subtitle: string;

    POSTS: any;
    page = 1;
    count = 0;
    tableSize = 7;
    tableSizes = [3, 6, 9, 12];
    searchInterest = [];
  
    constructor(private searchGroupService: SearchGroupService) { }
  
    ngAfterViewInit(): void {} 
    
    ngOnInit(): void {
      this.fetchPosts(this.searchInterest);
    }
    
    get loginFormControl() {
      return this.searchInterestForm.controls;
    }
  
    onSubmit(form:FormGroup){
      let formData = form.value;
      if((formData.interest != null && formData.interest != "") ||(formData.subInterest != null && formData.subInterest != "")){
        if(formData.subInterest !="" && formData.interest != ""){
          this.searchInterest = this.interestData.filter((ele:any) => ele.interest.toLowerCase() === formData.interest.toLowerCase() && ele.subinterest.toLowerCase() === formData.subInterest.toLowerCase());
          this.fetchPosts(this.searchInterest);
        }else if(formData.interest == ""){
          this.searchInterest = this.interestData.filter((ele:any) => ele.subinterest.toLowerCase() === formData.subInterest.toLowerCase());
          this.fetchPosts(this.searchInterest);
        }else{
          this.searchInterest = this.interestData.filter((ele:any) => ele.interest.toLowerCase() === formData.interest.toLowerCase());
          this.fetchPosts(this.searchInterest);
        }
      }
    }
  
    fetchPosts(data:any): void {
      this.POSTS = data;
    }
  
    onTableDataChange(event:any){
      this.page = event;
      this.fetchPosts(this.searchInterest );
    }  
  
    onTableSizeChange(event:any): void {
      this.tableSize = event.target.value;
      this.page = 1;
      this.fetchPosts(this.searchInterest );
    }  
   
}
