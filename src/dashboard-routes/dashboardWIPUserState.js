
import {inject} from 'aurelia-framework';
import {App} from '../app';
import {Router} from 'aurelia-router';
import {AuthService} from 'aurelia-auth';
import {HttpClient, json} from 'aurelia-fetch-client';
import {User} from '../classes/user';

@inject(AuthService, HttpClient, App, Router, User)
export class Dashboard {
  constructor(auth, httpClient, app, router, userManager){
    this.app = app;
    this.auth = auth;
    this.httpClient = httpClient;
    this.router = router;
    this.userManager = userManager;
  }
  
  authenticated=false;
  firstTimeInfo = false;
  types=['Charity', 'Volunteer'];
  
  async activate(){
    await fetch;
    this.httpClient.configure(config => {
      config
      .useStandardConfiguration()
      .withBaseUrl(process.env.BackendUrl);
    });
    this.user = this.userManager.getUser();
  }
  
  // getUser(){
  //   this.authenticated = this.auth.isAuthenticated();
  //   let uid = this.auth.getTokenPayload().sub;
  //   this.httpClient.fetch('/user/' + uid)
  //   .then(response => response.json())
  //   .then(data => {
  //     this.user = data;
  //     //this.firstTimeInfo = this.configured();
  //     if (this.user.userType === 'Charity'){
  //       this.user.userType = 1;
  //       this.router.navigate('charity');
  //     } else if (this.user.userType === 'Volunteer'){
  //       this.user.userType = 2;
  //       this.router.navigate('volunteer');
  //     }
  //   });
  // }
  
  //Form triggers updateUser()
  updateUser(){
    //let uid = this.auth.getTokenPayload().sub;
    
    //let tempUserType = this.user.userType;
    //Set user type to what was selected in the form
    this.httpClient.fetch('/user/' + uid, {
      method: 'put',
      body: json(this.user)
    })
    .then(response=>response.json());
  }
  
  // configured(){
  //   let returnVal = false;
  //   if (!('userType' in this.user)){
  //     returnVal = true;
  //     return returnVal;
  //   }
  //   return returnVal;
  // }
}
