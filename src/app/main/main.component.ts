import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public config: PerfectScrollbarConfigInterface = {};

  constructor(public router: Router) {}

  public innerWidth=0;
  public defaultSidebar='';
  public showMobileMenu = false;
  public expandLogo = false;
  public sidebartype = 'full';


  Logo() {
    this.expandLogo = !this.expandLogo;
  }

  ngOnInit() {
    // if (this.router.url === '/') {
    //   this.router.navigate(['/main']);
    // }
    this.defaultSidebar = this.sidebartype;
    this.handleSidebar();
  }

   @HostListener('window:resize', ['$event'])
   onResize(event:string) {
     this.handleSidebar();
   }

  handleSidebar() {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth < 1170) {
      this.sidebartype = 'mini-sidebar';
    } else {
      this.sidebartype = this.defaultSidebar;
    }
  }

  toggleSidebarType() {
    switch (this.sidebartype) {
      case 'full':
        this.sidebartype = 'mini-sidebar';
        break;

      case 'mini-sidebar':
        this.sidebartype = 'full';
        break;

      default:
    }
  }

  goToDashboard(interest:string){
    this.router.navigate(['/goodtime/']);
  }
}
