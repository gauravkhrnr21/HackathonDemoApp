import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-interest-shown',
  templateUrl: './interest-shown.component.html',
  styleUrls: ['./interest-shown.component.css']
})
export class InterestShownComponent { 
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

  interestForm!: FormGroup;
  constructor(private formBuilder: FormBuilder,private router: Router) { }

  ngOnInit(): void {
    this.interestForm = this.formBuilder.group({
      sport: this.formBuilder.array([]),
      food: this.formBuilder.array([]),
      creativity:this.formBuilder.array([]),
      technology: this.formBuilder.array([]),
      stock: this.formBuilder.array([]),
      parenting: this.formBuilder.array([]),
      shopping: this.formBuilder.array([])
    });
  }

  onSubmit(form:FormGroup) {
    let formData = form.value;
    console.log(formData);
  }

  onSportInterest(sport: string, isChecked: boolean) {
    const sportFormArray = <FormArray> this.interestForm.controls.sport;
    if (isChecked) {
      sportFormArray.push(new FormControl(sport));
    } else {
      let index = sportFormArray.controls.findIndex(x => x.value == sport)
      sportFormArray.removeAt(index);
    }
  }

  onFoodInterest(food: string, isChecked: boolean) {
    const foodFormArray = <FormArray> this.interestForm.controls.food;
    if (isChecked) {
      foodFormArray.push(new FormControl(food));
    } else {
      let index = foodFormArray.controls.findIndex(x => x.value == food)
      foodFormArray.removeAt(index);
    }
  }

  onCreativityInterest(creativity: string, isChecked: boolean) {
    const creativityFormArray = <FormArray> this.interestForm.controls.sport;
    if (isChecked) {
      creativityFormArray.push(new FormControl(creativity));
    } else {
      let index = creativityFormArray.controls.findIndex(x => x.value == creativity)
      creativityFormArray.removeAt(index);
    }
  }

  technologyInterest(technology: string, isChecked: boolean) {
    const technologyFormArray = <FormArray> this.interestForm.controls.sport;
    if (isChecked) {
      technologyFormArray.push(new FormControl(technology));
    } else {
      let index = technologyFormArray.controls.findIndex(x => x.value == technology)
      technologyFormArray.removeAt(index);
    }
  }

  stockInterest(stock: string, isChecked: boolean) {
    const stockFormArray = <FormArray> this.interestForm.controls.sport;
    if (isChecked) {
      stockFormArray.push(new FormControl(stock));
    } else {
      let index = stockFormArray.controls.findIndex(x => x.value == stock)
      stockFormArray.removeAt(index);
    }
  }

  parentingInterest(sport: string, isChecked: boolean) {
    const sportFormArray = <FormArray> this.interestForm.controls.sport;
    console.log(sportFormArray)

    if (isChecked) {
      sportFormArray.push(new FormControl(sport));
    } else {
      let index = sportFormArray.controls.findIndex(x => x.value == sport)
      sportFormArray.removeAt(index);
    }
  }

  shoppingInterest(sport: string, isChecked: boolean) {
    const sportFormArray = <FormArray> this.interestForm.controls.sport;
    console.log(sportFormArray)

    if (isChecked) {
      sportFormArray.push(new FormControl(sport));
    } else {
      let index = sportFormArray.controls.findIndex(x => x.value == sport)
      sportFormArray.removeAt(index);
    }
  }

  skip(){
    this.router.navigate(['/home']);
  }
}
