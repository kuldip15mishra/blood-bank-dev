import { Injectable } from '@angular/core';

@Injectable()
export class DataShareService {

  constructor() { }

  userData:any;

    setUserData(userData){
      this.userData=userData;
    }

    getUserData(){
      return this.userData;
    }



}
