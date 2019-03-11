import {Component }from '@angular/core'; 
import {Router}from "@angular/router"; 
import {RestClientService}from './rest.client.service'; 
@Component( {
selector:'app-root', 
templateUrl:'./app.component.html', 
styleUrls:['./app.component.scss']
})
export class AppComponent {
title = 'app'; 
ishowLogin = true; 
ishowlogout = false; 
constructor(private restclient:RestClientService, 
private router:Router) {

}


ngOnInit() {
let email = (localStorage.getItem('userid')); 

this.restclient.getloginStatus().subscribe(x =>  {
  if (x) {
    this.ishowLogin = false; 
    this.ishowlogout = true; 
    }
})
}


logout() {
  this.restclient.setloginStatus(false)
this.ishowLogin = true; 
this.ishowlogout = false; 
localStorage.removeItem('userid'); 

this.router.navigate(['/']); 
}
}
