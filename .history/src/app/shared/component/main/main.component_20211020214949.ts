import { HttpClient } from '@angular/common/http';
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
  user =   {id:"G1034122",name:"Gaurav Khairnar",designation :"Software Engineer", department:"I.T department",project:"Express"};
  events = [{author:"Pradeep",title:"Aquatic World Championships"},{author:"Ajikya",title:"Little League World Series"},{author:"Amit",title:"New York City Marathon"}]
  interests = [{name:"sports",path:"sport.jpg"},{name:"study circle",path:"studytime.jpg"},{name:"shopping",path:"shopping.jpg"},{name:"activity",path:"activity.jpg"}];

  constructor(public router: Router,private httpClient:HttpClient) {
    this.load();
  }

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

  load(){
    this.httpClient.get("http://localhost:8080/category/getAllCategory").subscribe(category =>{ 
      if(category != null){
        let resp:any =[];
        resp = category;
      }
    },error=>{
      console.log(error)
    });


   /* this.httpClient.get("http://localhost:8080/subCategory/getAllSubCategory").subscribe(subCategory =>{ 
      if(subCategory != null){
        console.log(subCategory);

      //  this.interests = category;
      }
    },error=>{
      console.log(error)
    });*/
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
