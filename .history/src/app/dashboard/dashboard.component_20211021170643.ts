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
    
    interestData :any = [ {name:"Sachin Patil",department:"Technology",location:"Pune",interest:"sport",subinterest:"cricket",contact:"9865543333"},
                        {name:"Manoj Kumar",department:"Adminstrator",location:"Pune",interest:"sport",subinterest:"cricket",contact:"8643223445"},
                        {name:"Deepak",department:"HR",location:"Pune",interest:"sport",subinterest:"football",contact:"7644233432"},
                        {name:"Salman Ali",department:"HR",location:"Pune",interest:"sport",subinterest:"football",contact:"8976565554"},
                        {name:"Rahul Tripati",department:"HR",location:"Pune",interest:"shopping",subinterest:"garment",contact:"9064545433"},
                        {name:"Mangesh naik",department:"Networking",location:"Pune",interest:"shopping",subinterest:"garmanent",contact:"85654455667"},
                        {name:"Prakash Shinde",department:"Technology",location:"Pune",interest:"shopping",subinterest:"garment",contact:"7865433435"},
                        {name:"Parag Nikam",department:"Security",location:"Pune",interest:"technology",subinterest:"java",contact:"8443345675"},
                        {name:"Ashish Sharma",department:"HR",location:"Pune",interest:"technology",subinterest:"java",contact:"9977656556"},
                        {name:"Kartik Shah",department:"Technology",location:"Pune",interest:"technology",subinterest:".net",contact:"9566546565"}];
  
    constructor(private searchGroupService: SearchGroupService) { }
  
    ngAfterViewInit(): void {} 
    
    ngOnInit(): void {
      this.fetchPosts(this.searchInterest);
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
