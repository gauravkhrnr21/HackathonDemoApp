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
  subinterests:any = [];
  interests = [];
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
      interests: this.formBuilder.array([]),
      subInterests: this.formBuilder.array([])
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

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
    console.log(this.fromDate);
    console.log(this.toDate);
  }
  get eventFormControl() {
    return this.eventForm.controls;
  }

  onSubmit(form:FormGroup){
    let formData = form.value;
    if(formData != null){
      formData['userId'] = this.user.userId;
      formData['userName'] = this.user.employeeName;
      delete formData.subInterests; 
      delete formData.interests; 
      console.log(formData);

      //delete formData.toDate;
      //delete formData.fromDate;
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

  onInterestChange(index:number,categoryId:number,option:string,isChecked:boolean){
    this.selected = index;
    this.getInterest(option,isChecked);
    this.loadSubInterest(index,categoryId,option,isChecked);
   /* switch (option) {
      case Constants.SPORT:
        this.subinterests = this.sports;
      break;
      case Constants.FOOD:
        this.subinterests = this.foods;
        break;
      case Constants.CREATIVITY:
        this.subinterests = this.creativities;
        break;
      case Constants.TECHNOLOGY:
        this.subinterests = this.technologies;
        break;
      case Constants.STOCK:
        this.subinterests = this.stocks;
        break;  
      case Constants.PARENTING:
        this.subinterests = this.parentings;
        break;
      case Constants.SHOPPING:
        this.subinterests = this.shoppings;
        break;
      default:
        break;
    }*/
  }

  getInterest(interest: string,isChecked: boolean) {
    const interestFormArray = <FormArray> this.eventForm.controls.interests;
    const subInterestFormArray = <FormArray> this.eventForm.controls.subInterests;
    if (isChecked) {
      interestFormArray.controls = [];
      interestFormArray.push(new FormControl(interest));
    } else {
      subInterestFormArray.controls = [];
      let index = interestFormArray.controls.findIndex(x => x.value == interest)
      interestFormArray.removeAt(index);
    }
  }

  loadSubInterest(index:number,categoryId:number,option:string,isChecked: boolean) {
    if(!isChecked){
      this.subinterests = [];
      return;
    }
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

  onSubInterestChange(index:number,subInterest: string,isChecked: boolean){
    this.subCatselected = index;
    const subInterestFormArray = <FormArray> this.eventForm.controls.subInterests;
    if (isChecked) {
      subInterestFormArray.push(new FormControl(subInterest));
    } else {
      let index = subInterestFormArray.controls.findIndex(x => x.value == subInterest)
      subInterestFormArray.removeAt(index);
    }
  }
}
