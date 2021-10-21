import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

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

  stocks:any = [ { name: 'EQUALITY', id: 'equality', group: 'stock'},
                { name: 'IPO', id: 'ipo', group: 'stock'},
                { name: 'MUTUAL FUNDS', id: 'mutualfunds', group: 'stock'} ];

  parentings:any = [ { name: 'BABY FOOD/HEALTH', id: 'food', group: 'parenting'},
                    { name: 'CHILD PSYCHOLOGY', id: 'psychology', group: 'parenting'},
                    { name: 'CHILDREN SPORTS', id: 'sport', group: 'parenting'},
                    { name: 'ROOMMATE', id: 'rommate', group: 'parenting'} ];

  shoppings:any = [  { name: 'GARMENTS', id: 'garment', group: 'shopping'},
                    { name: 'GROCERY', id: 'grocery', group: 'shopping'},
                    { name: 'SPORT EQUIPMENTS', id: 'sportequipment', group: 'shopping'},
                    { name: 'ELECTRONICS', id: 'elctronics', group: 'shopping'} ];

  interestForm!: FormGroup;

  result = [];
  userPerference:any =[];
  constructor(private formBuilder: FormBuilder,private router: Router,private httpClient:HttpClient) {
    this.load();
  }

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

  load(){
    this.httpClient.get<any>("http://localhost:8080/subCategory/getAllSubCategory").subscribe(resp =>{ 
      console.log(resp);
      this.sports = resp.filter((x:any) => x.groupName ==="sport");
      this.foods = resp.filter((x:any) => x.groupName ==="food");
      this.creativities = resp.filter((x:any) => x.groupName ==="creativity");
      this.technologies = resp.filter((x:any) => x.groupName ==="technology");
      this.stocks = resp.filter((x:any) => x.groupName ==="stock");
      this.parentings = resp.filter((x:any) => x.groupName ==="parenting");
      this.shoppings = resp.filter((x:any) => x.groupName ==="shopping");
    },error=>{
      console.log(error)
    });
  }

  onSubmit(form:FormGroup) {
    const sportFormArray = <FormArray> this.interestForm.controls.sport;
    sportFormArray.push(new FormControl());
    let formData = form.value;
    console.log(formData);
    console.log(this.userPerference);
  }

  onSportInterest(categoryId:number,subCategoryId: string, isChecked: boolean) {
    const sportFormArray = <FormArray> this.interestForm.controls.sport;
    if(subCategoryId != null){
      if (isChecked) {
        sportFormArray.push(new FormControl(subCategoryId));
        let obj = {"userId":1,"categoryId":categoryId,"subCategoryId":subCategoryId}
        this.userPerference.push(obj);
      } else {
        let index = sportFormArray.controls.findIndex(x => x.value == subCategoryId)
        sportFormArray.removeAt(index);
        this.userPerference = this.userPerference.filter((u:any) => u.subCategoryId != subCategoryId);  
      }
    }
  }

  onFoodInterest(categoryId:number,subCategoryId: string, isChecked: boolean) {
    const foodFormArray = <FormArray> this.interestForm.controls.food;
    if (isChecked) {
      foodFormArray.push(new FormControl(subCategoryId));
      let obj = {"userId":1,"categoryId":categoryId,"subCategoryId":subCategoryId}
      this.userPerference.push(obj);
    } else {
      let index = foodFormArray.controls.findIndex(x => x.value == subCategoryId)
      foodFormArray.removeAt(index);
      this.userPerference = this.userPerference.filter((u:any) => u.subCategoryId != subCategoryId);  
    }
  }

  onCreativityInterest(categoryId:number,subCategoryId: string, isChecked: boolean) {
    const creativityFormArray = <FormArray> this.interestForm.controls.creativity;
    if (isChecked) {
      creativityFormArray.push(new FormControl(subCategoryId));
      let obj = {"userId":1,"categoryId":categoryId,"subCategoryId":subCategoryId}
      this.userPerference.push(obj);
    } else {
      let index = creativityFormArray.controls.findIndex(x => x.value == subCategoryId)
      creativityFormArray.removeAt(index);
      this.userPerference = this.userPerference.filter((u:any) => u.subCategoryId != subCategoryId);  
    }
  }

  onTechnologyInterest(categoryId:number,subCategoryId: string, isChecked: boolean) {
    const technologyFormArray = <FormArray> this.interestForm.controls.technology;
    if (isChecked) {
      technologyFormArray.push(new FormControl(subCategoryId));
      let obj = {"userId":1,"categoryId":categoryId,"subCategoryId":subCategoryId}
      this.userPerference.push(obj);
    } else {
      let index = technologyFormArray.controls.findIndex(x => x.value == subCategoryId)
      technologyFormArray.removeAt(index);
      this.userPerference = this.userPerference.filter((u:any) => u.subCategoryId != subCategoryId);  
    }
  }

  onStockInterest(categoryId:number,subCategoryId: string, isChecked: boolean) {
    const stockFormArray = <FormArray> this.interestForm.controls.stock;
    if (isChecked) {
      stockFormArray.push(new FormControl(subCategoryId));
      let obj = {"userId":1,"categoryId":categoryId,"subCategoryId":subCategoryId}
      this.userPerference.push(obj);
    } else {
      let index = stockFormArray.controls.findIndex(x => x.value == subCategoryId)
      stockFormArray.removeAt(index);
      this.userPerference = this.userPerference.filter((u:any) => u.subCategoryId != subCategoryId);  
    }
  }

  onParentingInterest(categoryId:number,subCategoryId: string, isChecked: boolean) {
    const parentingFormArray = <FormArray> this.interestForm.controls.parenting;
    if (isChecked) {
      parentingFormArray.push(new FormControl(subCategoryId));
      let obj = {"userId":1,"categoryId":categoryId,"subCategoryId":subCategoryId}
      this.userPerference.push(obj);
    } else {
      let index = parentingFormArray.controls.findIndex(x => x.value == subCategoryId)
      parentingFormArray.removeAt(index);
      this.userPerference = this.userPerference.filter((u:any) => u.subCategoryId != subCategoryId);  
    }
  }

  onShoppingInterest(categoryId:number,subCategoryId: string, isChecked: boolean) {
    const shoppingFormArray = <FormArray> this.interestForm.controls.shopping;
    if (isChecked) {
      shoppingFormArray.push(new FormControl(subCategoryId));
      let obj = {"userId":1,"categoryId":categoryId,"subCategoryId":subCategoryId}
      this.userPerference.push(obj);
    } else {
      let index = shoppingFormArray.controls.findIndex(x => x.value == subCategoryId)
      shoppingFormArray.removeAt(index);
      this.userPerference = this.userPerference.filter((u:any) => u.subCategoryId != subCategoryId);  
    }
  }

  test(id:number){
    let arr = [2,3];
    return false;//arr.includes(id);
  } 
  skip(){
    this.router.navigate(['/home']);
  }
}
