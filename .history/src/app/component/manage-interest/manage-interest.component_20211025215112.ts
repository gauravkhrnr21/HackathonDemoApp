import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Constants } from 'src/app/shared/constant/constant';
import { TokenStorageService } from 'src/app/shared/service/token-storage.service';

@Component({
  selector: 'app-manage-interest',
  templateUrl: './manage-interest.component.html',
  styleUrls: ['./manage-interest.component.css']
})

export class ManageInterestComponent implements OnInit {
  POSTS: any;
  searchInterestForm: FormGroup;
  interestForm: FormGroup;
  submitted:boolean = true;
  userPerference:any =[];
  page = 1;
  count = 0;
  tableSize = 7;
  tableSizes = [3, 6, 9, 12];
  searchInterest = [];
  preSubCat:any = [];
  user:any;
  sports:any = [];
  foods:any = [];
  creativities:any = [];
  technologies:any = [];
  stocks:any = [];
  parentings:any = [];
  shoppings:any = [];
  interestData :any = [];
  sportGroupName = Constants.SPORT;
  foodGroupName = Constants.FOOD;
  creativityGroupName = Constants.CREATIVITY;
  technologyGroupName = Constants.TECHNOLOGY;
  stockGroupName = Constants.STOCK;
  parentingGroupName = Constants.PARENTING;
  shoppingGrupName = Constants.SHOPPING;
  
  constructor(private formBuilder: FormBuilder,private httpClient:HttpClient,private storageService:TokenStorageService) {
    this.searchInterestForm = this.formBuilder.group({
      interest: ['', []],
      subInterest: ['', []],
    });

    if(this.storageService.getUser() != null){
      this.user = this.storageService.getUser();
    }

    this.interestForm = this.formBuilder.group({
      sport: this.formBuilder.array([]),
      food: this.formBuilder.array([]),
      creativity:this.formBuilder.array([]),
      technology: this.formBuilder.array([]),
      stock: this.formBuilder.array([]),
      parenting: this.formBuilder.array([]),
      shopping: this.formBuilder.array([])
    });
    this.load();
  }

  load(){
    this.httpClient.get<any>("http://localhost:8080/subCategory/getAllSubCategory").subscribe(resp =>{ 
      this.sports = resp.filter((x:any) => x.groupName === this.sportGroupName);
      this.foods = resp.filter((x:any) => x.groupName === this.foodGroupName);
      this.creativities = resp.filter((x:any) => x.groupName === this.creativityGroupName);
      this.technologies = resp.filter((x:any) => x.groupName === this.technologyGroupName);
      this.stocks = resp.filter((x:any) => x.groupName === this.stockGroupName);
      this.parentings = resp.filter((x:any) => x.groupName === this.parentingGroupName);
      this.shoppings = resp.filter((x:any) => x.groupName === this.shoppingGrupName);
    },error=>{
      console.log(error)
    });

    let param ={
      userId : this.user.userId,
    }
    this.httpClient.post<any>("http://localhost:8080/subCategory/getAllUserSelectedCategory",param).subscribe(resp =>{ 
      if(resp != null && resp.length > 0){
        this.preSubCat = resp.map((ele:any) => ele.subCategoryId);
        resp.forEach((ele:any) => {
          this.userPerference.push({"userId":this.user.userId,"categoryId":ele.categoryId,"subCategoryId":ele.subCategoryId});
        });
      }
    });
  }

  ngOnInit(): void {
    this.fetchPosts(this.searchInterest);
  }
  
  get loginFormControl() {
    return this.searchInterestForm.controls;
  }

  onSubmit(form:FormGroup){
    let formData = form.value;
    if((formData.interest != null && formData.interest != "") ||(formData.subInterest != null && formData.subInterest != "")){
      if(formData.subInterest !="" && formData.interest != ""){
        this.searchInterest = this.interestData.filter((ele:any) => ele.interest.toLowerCase() === formData.interest.toLowerCase() && ele.subinterest.toLowerCase() === formData.subInterest.toLowerCase());
        this.fetchPosts(this.searchInterest);
      }else if(formData.interest == ""){
        this.searchInterest = this.interestData.filter((ele:any) => ele.subinterest.toLowerCase() === formData.subInterest.toLowerCase());
        this.fetchPosts(this.searchInterest);
      }else{
        this.searchInterest = this.interestData.filter((ele:any) => ele.interest.toLowerCase() === formData.interest.toLowerCase());
        this.fetchPosts(this.searchInterest);
      }
    }
  }

  fetchPosts(data:any): void {
    if(data != null && data.length > 0){
      this.POSTS = data;
    }else{
      this.POSTS = this.interestData;
    }
  }

  onTableDataChange(event:any){
    this.page = event;
    this.fetchPosts(this.searchInterest );
  }  

  onTableSizeChange(event:any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.fetchPosts(this.searchInterest );
  }  

  onSubmitForm(form:FormGroup) {
    const sportFormArray = <FormArray> this.interestForm.controls.sport;
    sportFormArray.push(new FormControl());
    let formData = form.value;
    if(this.userPerference != null){
      this.httpClient.put<any>("http://localhost:8080/subCategory/updateAllPrefernenceByCategory",this.userPerference).subscribe(resp =>{ 
        if(resp != null){
          alert("update successfully")
        }
      });
    }
  }

  onSportInterest(categoryId:number,subCategoryId: string, isChecked: boolean) {
    const sportFormArray = <FormArray> this.interestForm.controls.sport;
    if(subCategoryId != null){
      if (isChecked) {
        sportFormArray.push(new FormControl(subCategoryId));
        let obj = {userId:this.user.userId,categoryId:categoryId,subCategoryId:subCategoryId}
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
      let obj = {userId:this.user.userId,categoryId:categoryId,subCategoryId:subCategoryId}
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
      let obj = {userId:this.user.userId,categoryId:categoryId,subCategoryId:subCategoryId}
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
      let obj = {userId:this.user.userId,categoryId:categoryId,subCategoryId:subCategoryId}
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
      let obj = {userId:this.user.userId,categoryId:categoryId,subCategoryId:subCategoryId}
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
      let obj = {userId:this.user.userId,categoryId:categoryId,subCategoryId:subCategoryId}
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
      let obj = {userId:this.user.userId,categoryId:categoryId,subCategoryId:subCategoryId}
      this.userPerference.push(obj);
    } else {
      let index = shoppingFormArray.controls.findIndex(x => x.value == subCategoryId)
      shoppingFormArray.removeAt(index);
      this.userPerference = this.userPerference.filter((u:any) => u.subCategoryId != subCategoryId);  
    }
  }

  isChecked(id:number){
    return this.preSubCat.includes(id);
  } 
}
  


