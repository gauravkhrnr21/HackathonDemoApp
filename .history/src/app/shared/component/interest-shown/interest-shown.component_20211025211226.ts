import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../service/auth.service';
import { TokenStorageService } from '../../service/token-storage.service';

@Component({
  selector: 'app-interest-shown',
  templateUrl: './interest-shown.component.html',
  styleUrls: ['./interest-shown.component.css']
})
export class InterestShownComponent { 
  user:any;
  sports:any = [];

  foods:any = [];

  creativities:any = [];

  technologies:any = [];

  stocks:any = [];

  parentings:any = [];

  shoppings:any = [];

  interestForm!: FormGroup;

  result = [];
  userPerference:any =[];
  constructor(private formBuilder: FormBuilder,private router: Router,private httpClient:HttpClient,private storageService:TokenStorageService) {
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
   
    if(this.storageService.getUser() != null){
      this.user = this.storageService.getUser();
    }
  }

  load(){
    this.httpClient.get<any>("http://localhost:8080/subCategory/getAllSubCategory").subscribe(resp =>{ 
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
    let formData = form.value;
    if(this.userPerference != null){
      this.httpClient.post<any>("http://localhost:8080/subCategory/addAllSubCategoryByCategory",this.userPerference).subscribe(resp =>{ 
        if(resp != null){
          this.updateInterest();
          this.router.navigate(['/home']);
        }
      });
    }
  }

  updateInterest(){
    let user ={
      userId:this.user.userId,
      email: this.user.email
    };
    this.httpClient.post<any>("http://localhost:8080/users/setUserStatus",user).subscribe(resp =>{}); 
  }

  onSportInterest(categoryId:number,subCategoryId: string, isChecked: boolean) {
    const sportFormArray = <FormArray> this.interestForm.controls.sport;
    if(subCategoryId != null){
      if (isChecked) {
        sportFormArray.push(new FormControl(subCategoryId));
        let obj = {"userId":this.user.userId,"categoryId":categoryId,"subCategoryId":subCategoryId}
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
      let obj = {"userId":this.user.userId,"categoryId":categoryId,"subCategoryId":subCategoryId}
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
      let obj = {"userId":this.user.userId,"categoryId":categoryId,"subCategoryId":subCategoryId}
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
      let obj = {"userId":this.user.userId,"categoryId":categoryId,"subCategoryId":subCategoryId}
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
      let obj = {"userId":this.user.userId,"categoryId":categoryId,"subCategoryId":subCategoryId}
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
      let obj = {"userId":this.user.userId,"categoryId":categoryId,"subCategoryId":subCategoryId}
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
      let obj = {"userId":this.user.userId,"categoryId":categoryId,"subCategoryId":subCategoryId}
      this.userPerference.push(obj);
    } else {
      let index = shoppingFormArray.controls.findIndex(x => x.value == subCategoryId)
      shoppingFormArray.removeAt(index);
      this.userPerference = this.userPerference.filter((u:any) => u.subCategoryId != subCategoryId);  
    }
  }
  skip(){
    this.router.navigate(['/home']);
  }
}
