import { Component, OnInit } from '@angular/core';
import { SearchGroupService } from 'src/app/shared/service/search-group.service';

@Component({
  selector: 'app-manage-interest',
  templateUrl: './manage-interest.component.html',
  styleUrls: ['./manage-interest.component.css']
})

export class ManageInterestComponent implements OnInit {
  POSTS: any;
  page = 1;
  count = 0;
  tableSize = 7;
  tableSizes = [3, 6, 9, 12];

  constructor(private searchGroupService: SearchGroupService) { }

  ngOnInit(): void {
    this.fetchPosts();
  }  

  fetchPosts(): void {
    this.searchGroupService.getAllPosts({}).subscribe(
        response => {
          this.POSTS = response;
          console.log(response);
        },
        error => {
          console.log(error);
    });
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
  


