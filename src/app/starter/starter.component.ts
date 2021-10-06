import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  templateUrl: './starter.component.html'
})
export class StarterComponent implements AfterViewInit {
  subtitle: string;
  constructor(public router: Router) {
    this.subtitle = 'This is some text within a card block.';
  }

  ngAfterViewInit() {
    if (this.router.url === '/goodtime/starter') {
         this.router.navigate(['/goodtime/']);
     }
  }
}
