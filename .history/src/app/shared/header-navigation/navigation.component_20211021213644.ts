import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TokenStorageService } from '../service/token-storage.service';
declare var $: any;

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent {
  @Output()
  toggleSidebar = new EventEmitter<void>();

  public showSearch = false;
  closeResult:string = '';
  showChart:boolean = false;

  constructor(private router:Router,private modalService: NgbModal,private tokenStorageService:TokenStorageService) {}

  // This is for the first modal
  open(content1:string) {
    this.modalService.open(content1, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  signOut(){
    this.tokenStorageService.signOut();
    this.router.navigate(['/']);
  }

  openChart(){
    this.showChart = !this.showChart;
  }
}
