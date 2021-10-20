import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-interest-shown',
  templateUrl: './interest-shown.component.html',
  styleUrls: ['./interest-shown.component.css']
})
export class InterestShownComponent implements OnInit {
  interestForm : FormGroup; 
  sports:any = [  { name: 'CRICKET', id: 'cicket', group: 'sport' },
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

  creativities:any = [  { name: 'ZOOMBA', id: 'veg', group: 'creativity'}, 
                      { name: 'TRADITIONAL DANCE', id: 'traditionaldance', group: 'creativity'},
                      { name: 'MUSIC', id: 'music', group: 'creativity'},
                      { name: 'TABLA', id: 'tabla', group: 'creativity'},
                      { name: 'ART', id: 'art', group: 'creativity'},
                      { name: 'POEM', id: 'poem', group: 'creativity'},
                      { name: 'LITERATURE', id: 'literature', group: 'creativity'},
                      { name: 'ART & CRAFT', id: 'art', group: 'creativity'} ];

  technologies:any = [  { name: 'JAVA', id: 'java', group: 'technology'},
                      { name: 'SQL', id: 'sql', group: 'technology'},
                      { name: 'CLOUD', id: 'cloud', group: 'technology'},
                      { name: 'ANGULAR', id: 'angular', group: 'technology'},
                      { name: 'NODE JS', id: 'nodejs', group: 'technology'} ];

  stocks:any = [ { name: 'EQUALITY', id: 'java', group: 'technology'},
                { name: 'IPO', id: 'java', group: 'technology'},
                { name: 'MUTUAL FUNDS', id: 'java', group: 'technology'} ];

  parentings:any = [ { name: 'BABY FOOD/HEALTH', id: 'food', group: 'parenting'},
                    { name: 'CHILD PSYCHOLOGY', id: 'psychology', group: 'parenting'},
                    { name: 'CHILDREN SPORTS', id: 'sport', group: 'parenting'},
                    { name: 'ROOMMATE', id: 'rommate', group: 'parenting'} ];

  shoppings:any = [  { name: 'GARMENTS', id: 'garment', group: 'shopping'},
                    { name: 'GROCERY', id: 'grocery', group: 'shopping'},
                    { name: 'SPORT EQUIPMENTS', id: 'sportequipment', group: 'shopping'},
                    { name: 'ELECTRONICS', id: 'elctronics', group: 'shopping'} ];

  constructor(private formBuilder: FormBuilder,private router: Router) { 
    this.interestForm = this.formBuilder.group({
      sports: this.formBuilder.array([]),
      foods: this.formBuilder.array([]),
      creativities:this.formBuilder.array([]),
      technologies: this.formBuilder.array([]),
      stocks: this.formBuilder.array([]),
      parentings: this.formBuilder.array([]),
      shoppings: this.formBuilder.array([])
    });
    this.sports.push(new FormControl("cricket"));
  }

  ngOnInit(): void {}

  onSubmit(form:FormGroup) {
    let formData = form.value;
    console.log(formData);
  }

  onChange(email: string, isChecked: boolean) {
    const sportFormArray = <FormArray>this.interestForm.controls.sports;

    if (isChecked) {
      sportFormArray.push(new FormControl(email));
    } else {
      let index = sportFormArray.controls.findIndex(x => x.value == email)
      sportFormArray.removeAt(index);
    }
  }

  skip(){
    this.router.navigate(['/home']);
  }
}
