import {Component, OnInit }from '@angular/core'; 
import {RestClientService}from '../rest.client.service'; 
import {HttpHeaderResponse }from '@angular/common/http'; 
import {BrowserModule }from '@angular/platform-browser'; 
import {NgModule }from '@angular/core'; 
import {HttpModule, JsonpModule }from '@angular/http'; 


@Component( {
selector:'app-hospital', 
templateUrl:'./hospital.component.html', 
styleUrls:['./hospital.component.scss']

})
export class HospitalComponent implements OnInit {

constructor(private restclient:RestClientService) {}
mockData:any; 
getdata:any; 
firstdata:string; 
showForm:boolean; 
hospitals:any; 
hospital:any; 
activeHospitalId:any; 
showHospitalDetails:boolean; 

ngOnInit() {
//this.mockData = { "Name": "Albany HOSPITAL","Address":"Albany","Apos":30,"Bpos":20,"ABpos":40,"Opos":25,"Aminus":30,"Bminus":20,"ABminus":40,"Ominus":25}
this.showForm = false; 
this.showHospitalDetails = false; 
this.showhospitaldata(); 
}

selectChange(event:any) {
//this.showHospital(event.target.value);
}
selectDetailChange(event:any) {
for (var i = 0; i < this.hospitals.length; i++) {
if (this.hospitals[i]._id == event.target.value) {
this.activeHospitalId = event.target.value; 
return; 
}
}
}

showHospital() {
this.showHospitalDetails = false; 
let email = (localStorage.getItem('userid')); 
for (var i = 0; i < this.hospitals.length; i++) {
if (this.hospitals[i].email == email) {
this.hospital = this.hospitals[i]; 
this.activeHospitalId = this.hospitals[i]._id; 
console.log(this.hospital); 
return; 
}
}
}
// Update hospital data
onFormSubmit(event) {
var postadata = this.hospital; 
this.restclient.post('api/updatehospital', postadata).subscribe((result) =>  {
if (result) {this.showhospitaldata(); 
}
}, (error) =>  {
console.log(error); 
})
}
serializeForm(form) {
var obj =  {}; 
var elements = form.querySelectorAll("input, select, textarea"); 
for (var i = 0; i < elements.length; ++i) {
var element = elements[i]; 
var name = element.name; 
var value = element.value; 

if (name) {
obj[ name ] = value; 
}
}

return obj; 
}
//get hospital data
gethospitaldata() {
console.log("hospital"); 
var that = this; 
this.restclient.get('api/hospitalcollection').subscribe(
(result) =>  {
//var inp1 = document.getElementById("Name");
//var inp2 = document.getElementById("Address");
that.hospitals = result; 
that.showHospital(); 
that.showForm = true; 
that.showHospitalDetails = false; 
}, (error) =>  {
console.log(error); 
})
}

showhospitaldata() {
var that = this; 
this.restclient.get('api/hospitalcollection').subscribe(
(result) =>  {
that.hospitals = result; 
that.showHospitalDetails = true; 
that.showForm = false; 
that.getCurrentLoggedInUser(); 
}, (error) =>  {
console.log(error); 
})
}

getCurrentLoggedInUser() {
let email = (localStorage.getItem('userid')); 
for (var i = 0; i < this.hospitals.length; i++) {
if (this.hospitals[i].email == email) {
this.hospital = this.hospitals[i]; 
this.activeHospitalId = this.hospitals[i]._id; 
console.log(this.hospital); 
return; 
}
}
}

//post hospital data
posthospitaldata() {
console.log("hospital post"); 
this.restclient.post('api/posthospital', this.mockData).subscribe(
(result) =>  {
console.log("data is", result); 

}, (error) =>  {
console.log(error)
})
}
deleteall() {
this.restclient.post('api/deleteall',  {}).subscribe((result) =>  {
console.log(result); 
}, (error) =>  {
console.log(error); 
})
}
}

