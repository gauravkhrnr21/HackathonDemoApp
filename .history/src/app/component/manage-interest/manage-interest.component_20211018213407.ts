import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-manage-interest',
  templateUrl: './manage-interest.component.html',
  styleUrls: ['./manage-interest.component.css']
})

export class ManageInterestComponent implements OnInit {
  POSTS: any;
  searchInterestForm: FormGroup;
  submitted:boolean = true;
  page = 1;
  count = 0;
  tableSize = 7;
  tableSizes = [3, 6, 9, 12];
  interestData :any = [ {name:"Sachin Patil",department:"Technology",location:"Pune",interest:"cricket",contact:"989867654"},
                        {name:"Manoj Kumar",department:"Adminstrator",location:"Pune",interest:"cricket",contact:"989867654"},
                        {name:"John Smith",department:"HR",location:"US",interest:"cricket",contact:"989867654"},
                        {name:"Alex Oliver",department:"Networking",location:"UK",interest:"cricket",contact:"989867654"},
                        {name:"Prakash Patil",department:"Technology",location:"Delhi",interest:"cricket",contact:"989867654"},
                        {name:"Kevin Siddle",department:"Security",location:"Austrelia",interest:"cricket",contact:"989867654"},
                        {name:"Ashish Sharma",department:"HR",location:"Delhi",interest:"cricket",contact:"989867654"},
                        {name:"Kartik Shinde",department:"Technology",location:"Mumbai",interest:"cricket",contact:"989867654"}];
  
  dtOptions :any ={};
  countries$: Observable<Country[]>;
  total$: Observable<number>;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(private formBuilder: FormBuilder) {

    this.searchInterestForm = this.formBuilder.group({
      interest: ['', []],
      subInterest: ['', []],
    });
    setTimeout(()=>{  
      this.dtOptions = {
          pagingType: 'full_numbers',
          pageLength: 5,
        lengthMenu : [5, 10, 25],
          processing: true
        };
    }, 100);
  }

  constructor(public service: CountryService) {
    this.countries$ = service.countries$;
    this.total$ = service.total$;
  }

  onSort({column, direction}: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }


  ngOnInit(): void {
    this.fetchPosts();
  }
  
  get loginFormControl() {
    return this.searchInterestForm.controls;
  }

  onSubmit(form:FormGroup){
    let formData = form.value;
    if((formData.interest != null && formData.interest != "") ||(formData.subInterest != null && formData.subInterest != "")){
      alert("test");
    }
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
  


