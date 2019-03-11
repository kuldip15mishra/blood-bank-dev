import { Component, OnInit } from '@angular/core';
import { RestClientService } from '../rest.client.service';
import { DataShareService } from '../data.share.service';
import { FormGroup ,FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  userData: any;
  mockData: any;
  userProfiles: {};
  currentUserProfile: any;
  relativeModal:boolean;
  sameBloodModal:boolean;
  relativeForm:FormGroup;
  emergencyForm:FormGroup;

  constructor(private restclient: RestClientService,
    private dataservice: DataShareService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.userData = this.dataservice.getUserData();
    this.getUserprofile();
    this.relativeForm = this.formBuilder.group({
      email: ['', Validators.required],
      name: ['', Validators.required],
      phonenumber: ['', Validators.required],
      age: ['', Validators.required],

    });
    this.emergencyForm = this.formBuilder.group({
      email: ['', Validators.required],
      name: ['', Validators.required],
      phonenumber: ['', Validators.required],
      age: ['', Validators.required]

    })

  }


  ///get user data
  getUserprofile() {

    this.restclient.get('/api/usercollection').subscribe(
      (result) => {
        this.userProfiles = result;
        console.log(this.userProfiles);
        this.getCurrentUserProfie();
      }, (error) => {
        console.log(error);
      }
    )
  }
  getCurrentUserProfie() {
    console.log("gettingCurrent USr profiel");
    let usrprofiles: any = this.userProfiles;
    usrprofiles.forEach(element => {
      if (this.userData.email == element.email) {
        this.currentUserProfile = element;
        console.log(this, this.currentUserProfile);
      }

    });
  }
  //post user Data
  postUserData() {
    this.restclient.post('/api/usercollection', this.mockData).subscribe(
      (result) => {
        console.log("Sucess");
      }, (error) => {
        console.log(error)
      }
    )
  }

  socialSignIn() {
    this.restclient.post('api/socialSignIn()').subscribe(
      (result) => {
        console.log("Sucess");
      }, (error) => {
        console.log(error)
      }
    )
  }
  submitEmergencyForm(emergencyForm){
console.log(emergencyForm);

// let details={
//   "email":this.currentUserProfile.email,
//   "emergencyContact":emergencyForm
// }
// this.restclient.post('/api/postEmergency',details).subscribe(
//   (result)=>{
//     this.relativeModal=false;
//     this.getUserprofile();
//   },(error)=>{
//     console.log(error);
//   }
// )
  }
  submitrelativeForm(relativeForm){
    console.log(relativeForm);
  }
  
OpenEmergencyModal(){
  this.relativeModal=true;
}
OpenSameBLoodModal(){
  this.sameBloodModal=true;
}
}
