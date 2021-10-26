import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbCalendar, NgbDate, NgbDateParserFormatter, NgbDatepicker, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Constants } from 'src/app/shared/constant/constant';
import { TokenStorageService } from 'src/app/shared/service/token-storage.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {

  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate | null;
  toDate: NgbDate | null;
  eventForm: FormGroup;
  submitted:boolean = true;
  warnmsg:string = "";
  categoryId:any = [];
  subCategoryId = [];
  sports:any =  [];
  foods:any = [];
  creativities:any = [];
  technologies:any = [];
  stocks:any = [];
  parentings:any = [];
  shoppings:any = [];
  eventInfo:any = [];
  categories:any = [];
  subCategories:any = [];
  selected:number = -1;
  subCatselected:number = -1;
  minDate = new Date();
  maxDate = new Date();
  bsValue = new Date();
  user:any;

  constructor(private formBuilder: FormBuilder,private calendar: NgbCalendar, public formatter: NgbDateParserFormatter,private httpClient: HttpClient,private storageService:TokenStorageService) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
    this.eventForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      discription: ['', [Validators.required, Validators.minLength(10)]],
      fromDt: ['', [Validators.required]],
      toDt: ['', [Validators.required]],
      venue: ['', [Validators.required, Validators.minLength(4)]],
      categortId: this.formBuilder.array([]),
      subCategoryId: this.formBuilder.array([])
    });
    if(this.storageService.getUser() != null){
      this.user = this.storageService.getUser();
    }
    this.load();
  }

  ngOnInit(){}

  load(){
    this.httpClient.get<any>("http://localhost:8080/category/getAllCategory").subscribe(categories =>{
      console.log(categories); 
      if(categories != null){
        this.categories = categories;
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

  get eventFormControl() {
    return this.eventForm.controls;
  }

  onSubmit(form:FormGroup){
    let formData = form.value;
    if(formData != null){
      formData['userId'] = this.user.userId;
      formData['userName'] = this.user.employeeName;
      formData['categoryId'] = this.categoryId[0];
      formData['subCategoryId'] = this.subCategoryId[0];

      console.log(formData);

      this.httpClient.post<any>("http://localhost:8080/events/addEvent",formData).subscribe(event =>{ 
        this.eventForm.reset();
        this.subCatselected =-1;
        this.selected = -1;
        this.load();
      },error=>{
       console.log(error)
     });
    }
  }

  clearFormArray = (formArray: FormArray) => {
    formArray = this.formBuilder.array([]);
  }

  onInterestChange(index:number,categoryId:number,isChecked:boolean){
    this.selected = index;
    this.getInterest(categoryId,isChecked);
    this.loadSubInterest(index,categoryId,isChecked);
  }

  getInterest(categoryId:number,isChecked: boolean) {
    const categoryFormArray = <FormArray> this.eventForm.controls.categortId;
    const subCategoryFormArray = <FormArray> this.eventForm.controls.subCategoryId;
    if (isChecked) {
      categoryFormArray.controls = [];
      categoryFormArray.push(new FormControl(categoryId));
    } else {
      subCategoryFormArray.controls = [];
      let index = categoryFormArray.controls.findIndex(x => x.value == categoryId)
      categoryFormArray.removeAt(index);
    }
  }

  loadSubInterest(index:number,categoryId:number,isChecked: boolean) {
    let param = {
      categoryId:categoryId
    }
    this.httpClient.post("http://localhost:8080/subCategory/getAllSubCategoryByCategory",param).subscribe(subCategories =>{ 
      if(subCategories != null){
        this.subCategories = subCategories;
      }
    },error=>{
      console.log(error)
    });  
  }

  onSubInterestChange(index:number,subCategoryId: number,isChecked: boolean){
    this.subCatselected = index;
    const subCategoryFormArray = <FormArray> this.eventForm.controls.subCategoryId;
    if (isChecked) {
      subCategoryFormArray.controls = [];
      subCategoryFormArray.push(new FormControl(subCategoryId));
      console.log(subCategoryFormArray);
    } else {
      subCategoryFormArray.controls = [];
      let index = subCategoryFormArray.controls.findIndex(x => x.value == subCategoryId)
      subCategoryFormArray.removeAt(index);
    }
   
  }
}
