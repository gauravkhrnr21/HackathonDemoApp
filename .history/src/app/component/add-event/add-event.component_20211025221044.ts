import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbCalendar, NgbDate, NgbDateParserFormatter, NgbDatepicker, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
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

  interests = [{id:"sport",name:"sport",group:"interest"},{id:"food",name:"food",group:"interest"},{id:"criativity",name:"criativity",group:"interest"},{id:"technology",name:"technology",group:"interest"},{id:"technology",name:"stock",group:"interest"},{id:"parenting",name:"parenting",group:"interest"},{id:"shopping",name:"shopping",group:"interest"}];
  sports:any =  [ { name: 'CRICKET', id: 'cicket', group: 'sport' },
                  { name: 'FOOT BALL', id: 'football', group: 'sport' },
                  { name: 'BADMITTON', id: 'badmitton', group: 'sport' },
                  { name: 'CARROM', id: 'carrom', group: 'sport' },
                  { name: 'TREKKING', id: 'trekkin', group: 'sport' },
                  { name: 'CYCLING', id: 'cycling', group: 'sport' },
                  { name: 'BOATING', id: 'boating', group: 'sport' },
                  { name: 'MARATHON', id: 'marathon', group: 'sport' },
                  { name: 'TABLE TENNIS', id: 'tabletennis', group: 'sport' },
                  { name: 'YOGA', id: 'yoga', group: 'sport' },
                  { name: 'WORKOUT', id: 'workout', group: 'sport' } ];

    foods:any = [ { name: 'VEG', id: 'veg', group: 'food'},
                  { name: 'NON VEG', id: 'nonveg', group: 'food'} ];

    creativities:any = [ { name: 'ZOOMBA', id: 'veg', group: 'creativity'}, 
                  { name: 'TRADITIONAL DANCE', id: 'traditionaldance', group: 'creativity'},
                  { name: 'MUSIC', id: 'music', group: 'creativity'},
                  { name: 'TABLA', id: 'tabla', group: 'creativity'},
                  { name: 'ART', id: 'art', group: 'creativity'},
                  { name: 'POEM', id: 'poem', group: 'creativity'},
                  { name: 'LITERATURE', id: 'literature', group: 'creativity'},
                  { name: 'ART & CRAFT', id: 'art', group: 'creativity'} ];

    technologies:any =  [ { name: 'JAVA', id: 'java', group: 'technology'},
                          { name: 'SQL', id: 'sql', group: 'technology'},
                          { name: 'CLOUD', id: 'cloud', group: 'technology'},
                          { name: 'ANGULAR', id: 'angular', group: 'technology'},
                          { name: 'NODE JS', id: 'nodejs', group: 'technology'} ];

    stocks:any =  [ { name: 'EQUALITY', id: 'equality', group: 'technology'},
                    { name: 'IPO', id: 'ipo', group: 'technology'},
                    { name: 'MUTUAL FUNDS', id: 'mutualfunds', group: 'technology'} ];

    parentings:any = [  { name: 'BABY FOOD/HEALTH', id: 'food', group: 'parenting'},
                        { name: 'CHILD PSYCHOLOGY', id: 'psychology', group: 'parenting'},
                        { name: 'CHILDREN SPORTS', id: 'sport', group: 'parenting'},
                        { name: 'ROOMMATE', id: 'rommate', group: 'parenting'} ];

    shoppings:any = [ { name: 'GARMENTS', id: 'garment', group: 'shopping'},
                      { name: 'GROCERY', id: 'grocery', group: 'shopping'},
                      { name: 'SPORT EQUIPMENTS', id: 'sportequipment', group: 'shopping'},
                      { name: 'ELECTRONICS', id: 'elctronics', group: 'shopping'} ];
  eventInfo:any = [];
  categories:any = [];
  selected:number = -1;
  subCatselected:number = -1;
  user:any;

  constructor(private formBuilder: FormBuilder,private calendar: NgbCalendar, public formatter: NgbDateParserFormatter,private httpClient: HttpClient,private storageService:TokenStorageService) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
    this.eventForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      discription: ['', [Validators.required, Validators.minLength(10)]],
      fromDate: ['', [Validators.required]],
      toDate: ['', [Validators.required]],
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
    this.httpClient.get<any>("http://localhost:8080/category/getAllCategory").subscribe(category =>{ 
      if(event != null){
        this.eventInfo = category;
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
      delete formData.toDate;
      delete formData.fromDate;
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

  onChange(i:number,option:string,isChecked:boolean){
    this.selected = i;
    this.getSelectedInterest(option,isChecked);
    if(!isChecked){
      this.subinterests = [];
      return;
    }
    switch (option) {
      case "sport":
        this.subinterests = this.sports;
      break;
      case "food":
        this.subinterests = this.foods;
        break;
      case "criativity":
        this.subinterests = this.creativities;
        break;
      case "technology":
        this.subinterests = this.technologies;
        break;
      case "stock":
        this.subinterests = this.stocks;
        break;  
      case "parenting":
        this.subinterests = this.parentings;
        break;
      case "shopping":
        this.subinterests = this.shoppings;
        break;
      default:
        break;
    }
  }

  getSelectedInterest(interest: string, isChecked: boolean) {
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

  getSelectedSubInterest(index:number,subInterest: string, isChecked: boolean) {
    this.subCatselected = index;
    /*let param = {
      "categoryId":1
    }
    this.httpClient.post("http://localhost:8080/subCategory/getAllSubCategoryByCategory",param).subscribe(category =>{ 
       // console.log(category);
      if(category != null){
      //  this.interests = category;
      }
    },error=>{
      console.log(error)
    });*/
    const subInterestFormArray = <FormArray> this.eventForm.controls.subInterests;
    if (isChecked) {
      subInterestFormArray.push(new FormControl(subInterest));
    } else {
      let index = subInterestFormArray.controls.findIndex(x => x.value == subInterest)
      subInterestFormArray.removeAt(index);
    }
  }
}
