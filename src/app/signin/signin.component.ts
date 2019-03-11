import { Component, OnInit, Input, ViewChild, NgZone } from '@angular/core';
import { AuthService, GoogleLoginProvider } from 'angular-6-social-login';
import { RestClientService } from '../rest.client.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
//import { } from '@types/googlemaps';
import {Router} from "@angular/router";
import { DataShareService } from '../data.share.service';

const BloodGroup ={ "Apos":30,"Bpos":20,"ABpos":40,"Opos":25,"Aminus":30,"Bminus":20,"ABminus":40,"Ominus":25}
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  user: any;
  closeResult: String;
  registerForm: FormGroup;
  userInfoForm: FormGroup;
  hospitalform: FormGroup;
  bloodbankform: FormGroup;
  userType: string;
  roleModal: boolean;
  userModal: boolean;
  hospitalModal: boolean;
  bloodbankmodal: boolean;
  lat: number = 0;
  lng: number = 0;
  geocoder: any;
  
  constructor(private formBuilder: FormBuilder,
    private socialAuthService: AuthService,
    private restclient: RestClientService,
    private dataShare:DataShareService,
    private router:Router
  
    ) {

    }

  ngOnInit() {
    
    this.registerForm = this.formBuilder.group({
      roletype: ['', Validators.required],
    });

    this.userInfoForm = this.formBuilder.group({
      email: ['', Validators.required],
      name: ['', Validators.required],
      address: ['', Validators.required],
      phonenumber: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      zip: ['', Validators.required],
      age: ['', Validators.required],
      bloodGroup: ['', Validators.required],

    });

    this.hospitalform = this.formBuilder.group({
      email: ['', Validators.required],
      name: ['', Validators.required],
      address: ['', Validators.required],
      phonenumber: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      zip: ['', Validators.required],
      AmbulanceNumber: ['', Validators.required],

    });
    this.bloodbankform = this.formBuilder.group({
      email: ['', Validators.required],
      name: ['', Validators.required],
      address: ['', Validators.required],
      phonenumber: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      zip: ['', Validators.required],

    });
    this.getLocationOfUser();
    this.roleModal =false ;
    this.userModal =  false;
    this.hospitalModal = false;
    this.bloodbankmodal = false;

  }


  ///gmail sigin 
  public socialSignIn() {
    let socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    let registeredUser;
    console.log()
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(" sign in data : ", userData);
        this.user = userData;
        console.log(userData);
        localStorage.setItem('userid', this.user.email);
        this.restclient.setloginStatus(true)
        if (this.user.email != null) {
          this.restclient.get('/api/registeredUsers').subscribe(
            (result) => {
              registeredUser = result;

              this.validateUser(registeredUser);
            }, (error) => {
              console.log(error);
            });
        }
      }
    );

  }


  validateUser(registeredUser) {
    registeredUser.forEach(element => {
      if (element.email == this.user.email) {
       this.routeUser(element);
      }
    });

    this.openRoleModal();
  }

  routeUser(element) {
    console.log(element);
    this.dataShare.setUserData(element);
if(element.roletype=='hospitalManager'){  
this.router.navigate(['/hospital']);
}else if(element.roletype == 'bloodBankManager'){
  this.router.navigate(['/bloodBank']);
}else{ 
  this.router.navigate(['/user']);
}
    console.log(element);
  }



  submitUserRole(roletype) {
    console.log(this.user, roletype);
    this.restclient.post('/api/registerUser', { "email": this.user.email, "roletype": roletype }).subscribe(
      (result) => {
        console.log("userdata posted");
        if (roletype == 'hospitalManager') {
          this.closeRoleModal();
          this.hospitalform.controls['email'].setValue(this.user.email);
          this.openHospitalModal();
        } else if (roletype == 'bloodBankManager') {
          this.closeRoleModal();
          this.bloodbankform.controls['email'].setValue(this.user.email);
          this.openBloodBankModal();

        } else {
          this.closeRoleModal();
          this.userInfoForm.controls['email'].setValue(this.user.email);
          this.userInfoForm.controls['name'].setValue(this.user.name);
          this.openUserModal();
        }
      },
      (error) => {
        console.log(error);
      });




  }
  submitUserForm(userform) {
    console.log(userform);
    this.restclient.post('/api/postuser', userform).subscribe(
      (result) => {
        this.closeUserModal();
        console.log()
        this.routeUser({ "email": this.user.email, "roletype": this.registerForm.value.roletype })
      }, (error) => {
        console.log(error)
      }
    )

  }

  addNewPropertyToData(dataObj){
    let result =Object.assign({},dataObj);
    Object.keys(BloodGroup).map(x=>{
        result[x] =0;
    })

    return result;
  }
  submitHositalform(hospitalform:any) {
   
    let location={
      latitude:this.lat,
      longitude:this.lng
    }
    
    //hospitalform.push({"location":location});
    hospitalform["location"]=location;
    this.restclient.post('/api/posthospital', this.addNewPropertyToData(hospitalform)).subscribe(
      (result) => {
        this.closeHospitalModal();
     
        this.routeUser({ "email": this.user.email, "roletype": "hospitalManager" })
      }, (error) => {
        console.log(error)
      }
    )
  }

  submitBloodBankform(bloodBankform:any) {
    console.log(bloodBankform);
    let location={
      latitude:this.lat,
      longitude:this.lng
    }
   //bloodBankform.push({"location":location});
   bloodBankform["location"] =location;
    this.restclient.post('/api/postbloodbank', this.addNewPropertyToData(bloodBankform)).subscribe(
      (result) => {
        this.closeBloodBankModal()
        this.routeUser({ "email": this.user.email, "roletype": "bloodBankManager" })
      }, (error) => {
        console.log(error)
      }
    )
  }


  openRoleModal() {
    this.roleModal = true;
  }
  closeRoleModal() {
    this.roleModal = false;
  }

  openUserModal() {
    this.userModal = true;
  }
  closeUserModal() {
    this.userModal = false;
  }
  openHospitalModal() {
    this.hospitalModal = true
  }
  closeHospitalModal() {
    this.hospitalModal = false;
  }

  openBloodBankModal() {
    this.bloodbankmodal = true;
  }
  closeBloodBankModal() {
    this.bloodbankmodal = false;
  }

  getLocationOfUser(){
    if (navigator.geolocation) {
      setTimeout('',1000);
          navigator.geolocation.getCurrentPosition((geoSuccess) => {
         console.log(geoSuccess);
         this.lat=geoSuccess.coords.latitude;
         this.lng=geoSuccess.coords.longitude;
          },
          (geoError)=>{
             console.log(geoError);
          });
        } else {
          alert("Geolocation is not supported by this browser.");
        }
  }
}
