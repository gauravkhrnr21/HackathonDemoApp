import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { TokenStorageService } from '../../service/token-storage.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  closeResult:string = '';
  public config: PerfectScrollbarConfigInterface = {};
  user:any;  //{id:"G1034122",name:"Gaurav Khairnar",designation :"Software Engineer", department:"I.T department",project:"Express"};
  events = [{author:"Pradeep",title:"Aquatic World Championships"},{author:"Ajikya",title:"Little League World Series"},{author:"Amit",title:"New York City Marathon"}]
  interests:any = [{name:"sports",path:"sport.jpg"},{name:"study circle",path:"studytime.jpg"},{name:"shopping",path:"shopping.jpg"},{name:"activity",path:"activity.jpg"}];
  eventInfo = [];

  constructor(private modalService: NgbModal,public router: Router,private httpClient:HttpClient,private storageService :TokenStorageService) {
    if(this.storageService.getUser() != null){
      this.user = this.storageService.getUser();
    }
    this.load();
  }

  public innerWidth=0;
  public defaultSidebar='';
  public showMobileMenu = false;
  public expandLogo = false;
  public sidebartype = 'full';
  showEvent:boolean = false;

  Logo() {
    this.expandLogo = !this.expandLogo;
  }

  ngOnInit() {
    this.defaultSidebar = this.sidebartype;
    this.handleSidebar();
  }

  load(){
    let params = {
      userId : this.user.userId
    }
    this.httpClient.post<any>("http://localhost:8080/category/getAllCategoryById",params).subscribe(category =>{ 
      if(category != null){
        this.interests = category;
      }
    },error=>{
      console.log(error)
    });


    this.httpClient.get<any>("http://localhost:8080/events/getEvents").subscribe(event =>{ 
      if(event != null){
        this.eventInfo = event;
      }
    },error=>{
     console.log(error)
   });
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

  openChart(){
    alert("tee")
    this.showChart = !this.showChart;
  }

  open(content1:string) {
    this.modalService.open(content1, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
}
