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
