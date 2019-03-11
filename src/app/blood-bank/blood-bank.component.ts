import { Component, OnInit } from '@angular/core';
import { RestClientService} from '../rest.client.service';
import { HttpHeaderResponse } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';



@Component({
  selector: 'app-blood-bank',
  templateUrl: './blood-bank.component.html',
  styleUrls: ['./blood-bank.component.scss']
})
export class BloodBankComponent implements OnInit {

  constructor(private restclient: RestClientService) { }
  mockData: any;
  getdata: any;
  firstdata:string;
  showForm:boolean;
  bloodbanks:any;
  bloodbank:any;
  activebloodbankId:any;
  showbloodbankDetails:boolean;
  
 ngOnInit() {
    this.mockData = { "Name": "Albany blood bank","Address":"Albany","Apos":30,"Bpos":20,"ABpos":40,"Opos":25,"Aminus":30,"Bminus":20,"ABminus":40,"Ominus":25}
    this.showForm = false;
    this.showbloodbankDetails = false;
    this.showbloodbankdata();
  }

  selectChange(event:any){
   // this.showbloodbank(event.target.value);
  }
  selectDetailChange(event:any){
    for(var i = 0; i < this.bloodbanks.length; i++){
      if(this.bloodbanks[i]._id == event.target.value){
        this.activebloodbankId = event.target.value;
        return;
      }
    }
  }

  showbloodbank(){
    this.showbloodbankDetails = false;
    let email = (localStorage.getItem('userid')); 
    for(var i = 0; i < this.bloodbanks.length; i++){
      if(this.bloodbanks[i].email == email){
        this.bloodbank = this.bloodbanks[i];
        console.log("in showbloodbank")
        //console.log(this.bloodbank);
        return;
      }
    }
  }
// Update bloodbank data
onFormSubmit(event){
  var postadata = this.bloodbank //this.serializeForm(event.target);
  this.restclient.post('api/updatebloodbank', postadata).subscribe((result)=>{
    if(result){
      this.showbloodbankdata();
    }
  }, (error)=>{
    console.log(error);
  })
}
serializeForm(form) {
  var obj = {};
  var elements = form.querySelectorAll( "input, select, textarea" );
  for( var i = 0; i < elements.length; ++i ) {
    var element = elements[i];
    var name = element.name;
    var value = element.value;

    if( name ) {
      obj[ name ] = value;
    }
  }

  return obj;
}
//get bloodbank data
getbloodbankdata(){
  console.log("bloodbank");
  var that = this;
  this.restclient.get('api/bloodbankcollection').subscribe(
    (result) => {
      
      that.bloodbanks = result;
      that.showbloodbank();
      that.showForm = true;
      that.showbloodbankDetails = false;
    }, (error) => {
      console.log(error);
    }
  )
}
getCurrentLoggedInUser() {
  let email = (localStorage.getItem('userid')); 
  for (var i = 0; i < this.bloodbanks.length; i++) {
  if (this.bloodbanks[i].email == email) {
  this.bloodbank = this.bloodbanks[i]; 
  this.activebloodbankId = this.bloodbanks[i]._id; 
  console.log(this.bloodbank); 
  return; 
  }
  }
  }
showbloodbankdata(){
  var that = this;
  this.restclient.get('api/bloodbankcollection').subscribe(
    (result) => {
      console.log("in show para");
      that.bloodbanks = result;
      that.showbloodbankDetails = true;
      that.showForm = false;
      that.getCurrentLoggedInUser(); 
      console.log(result[0]._id)
    }, (error) => {
      console.log(error);
    }
  )
}


//post bloodbank data
postbloodbankdata() {
  console.log("bloodbank post");
  this.restclient.post('api/postbloodbank',this.mockData).subscribe(
    (result) => {
      console.log("data is",result);

    }
    ,(error) => {
      console.log(error)
    }
  )
}
deleteall(){
  this.restclient.post('api/deleteall', {}).subscribe((result)=>{
    console.log(result);
  }, (error)=>{
    console.log(error);
  })
}
}


