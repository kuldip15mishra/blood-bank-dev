import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SocialLoginModule,  AuthServiceConfig,  GoogleLoginProvider,} from "angular-6-social-login";
import { HttpClientModule } from '@angular/common/http'; 
import {FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { BloodBankComponent } from './blood-bank/blood-bank.component';
import { HospitalComponent } from './hospital/hospital.component';
import { UserComponent } from './user/user.component';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { RestClientService } from './rest.client.service';
import { DataShareService } from './data.share.service';


// app routings
const routes: Routes = [  
  { path: 'bloodBank', component:BloodBankComponent  },
  
  { path: 'user', component:UserComponent  },
  
  { path: 'hospital', component:HospitalComponent  },
  
  
  { path: 'signin', component:SigninComponent  },
  
  // { path: '', redirectTo: '/user', pathMatch: 'full' },
];


/// auth config for gmail

// Configs 
export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider("323609165869-00j1gtbnrggtma8kjfadjjmr9ums964k.apps.googleusercontent.com")
        }
      ]
  );
  return config;
}


@NgModule({
  declarations: [
    AppComponent,
    BloodBankComponent,
    HospitalComponent,
    UserComponent,
    SigninComponent    
  ],
  imports: [
    BrowserModule,SocialLoginModule,HttpClientModule,FormsModule,ReactiveFormsModule,AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB8UDPylOPQX2dHwac4aAgCSwG3Cy0luqs'
    }), RouterModule.forRoot(routes),
  ],
  providers: [  {
    provide: AuthServiceConfig,
    useFactory: getAuthServiceConfigs
  },RestClientService,DataShareService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
