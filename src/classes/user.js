import {inject} from 'aurelia-framework';
import {App} from '../app';
import {AuthService} from 'aurelia-auth';
import {HttpClient, json} from 'aurelia-fetch-client';
inject(App, HttpClient, AuthService);
export class User {
  constructor(app, httpClient, authService){
    this.app = app;
    this.httpClient = httpClient;
    this.auth = authService;
    console.log(app);
    console.log(httpClient);
    console.log(authService);
  }
  storedUser=null;
  authenticated=false;
  firstTimeInfo=false;
  
  configured(){
    let returnVal = false;
    if (!('userType' in this.user)){
      returnVal = true;
      return returnVal;
    }
    return returnVal;
  }
  
  getUser(){
    if (this.storedUser !== null){
      return Promise.resolve(this.stored_user);
    }
    this.authenticated = this.auth.isAuthenticated();
    if (this.authenticated){
      let uid = this.auth.getTokenPayload().sub;
      this.httpClient.fetch(process.env.BackendUrl + '/user/' + uid)
      .then(response => response.json())
      .then(data => {
        this.usestored_user = data;
        this.firstTimeInfo = this.configured();
        if (this.stored_user.userType === 'Charity'){
          this.stored_user.userType = 1;
        } else if (this.stored_user.userType === 'Volunteer'){
          this.stored_user.userType = 2;
        }
      });
    }
  }
}
