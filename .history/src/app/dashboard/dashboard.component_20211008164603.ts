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
  
    constructor(private searchGroupService: SearchGroupService) { }
  
    ngAfterViewInit(): void {}  
}
