import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-interest-shown',
  templateUrl: './interest-shown.component.html',
  styleUrls: ['./interest-shown.component.css']
})
export class InterestShownComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  skip(){
    this.router.navigate(['/home']);
  }
}
