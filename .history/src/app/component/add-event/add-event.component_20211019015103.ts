import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbCalendar, NgbDate, NgbDateParserFormatter, NgbDatepicker, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

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
  //loginInvalid :boolean = false;
  warnmsg:string = "";

  interests = [{id:"sport",name:"sport"},{id:"food",name:"food"},{id:"criativity",name:"criativity"},{id:"technology",name:"technology"},{id:"stock",name:"stock"},{id:"parenting",name:"parenting"},{id:"shopping",name:"shopping"}];
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

  constructor(private formBuilder: FormBuilder,private calendar: NgbCalendar, public formatter: NgbDateParserFormatter) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
    this.eventForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      discription: ['', [Validators.required, Validators.minLength(10)]],
      fromDate: ['', [Validators.required]],
      toDate: ['', [Validators.required]],
      venue: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  ngOnInit(){}

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
    alert('test');
    let formData = form.value;
    console.log(formData);
    if(formData != null){
    }
  }
}
