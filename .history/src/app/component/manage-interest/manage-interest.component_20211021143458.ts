import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

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

  
  interestData :any = [ {name:"Sachin Patil",department:"Technology",location:"Pune",interest:"sport",subinterest:"cricket",contact:"9865543333"},
                        {name:"Manoj Kumar",department:"Adminstrator",location:"Pune",interest:"sport",subinterest:"cricket",contact:"8643223445"},
                        {name:"Deepak",department:"HR",location:"Pune",interest:"sport",subinterest:"football",contact:"7644233432"},
                        {name:"Salman Ali",department:"HR",location:"Pune",interest:"sport",subinterest:"football",contact:"8976565554"},
                        {name:"Rahul Tripati",department:"HR",location:"Pune",interest:"shopping",subinterest:"garment",contact:"9064545433"},
                        {name:"Mangesh naik",department:"Networking",location:"Pune",interest:"shopping",subinterest:"garmanent",contact:"85654455667"},
                        {name:"Prakash Shinde",department:"Technology",location:"Pune",interest:"shopping",subinterest:"garment",contact:"7865433435"},
                        {name:"Parag Nikam",department:"Security",location:"Pune",interest:"technology",subinterest:"java",contact:"8443345675"},
                        {name:"Ashish Sharma",department:"HR",location:"Pune",interest:"technology",subinterest:"java",contact:"9977656556"},
                        {name:"Kartik Shah",department:"Technology",location:"Pune",interest:"technology",subinterest:".net",contact:"9566546565"}];
  
  constructor(private formBuilder: FormBuilder,private httpClient:HttpClient) {
    this.searchInterestForm = this.formBuilder.group({
      interest: ['', []],
      subInterest: ['', []],
    });

    this.interestForm = this.formBuilder.group({
      sport: this.formBuilder.array([2,3]),
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

    let param ={
      userId : 1,
    }
    this.httpClient.post<any>("http://localhost:8080/subCategory/getAllUserSelectedCategory",param).subscribe(resp =>{ 
      console.log(resp);
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
    this.POSTS = data;
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
   // alert("test");
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
    let arr = [1,2,3];

    return arr.includes(id);
  } 
}
  


