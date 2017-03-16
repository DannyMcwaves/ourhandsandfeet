import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
inject(HttpClient);
export class User {
  constructor(httpClient){
    this.httpClient = httpClient;
    //console.log(httpClient);
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
  async activate(){
    await fetch;
    this.httpClient.configure(config => {
      config
      .useStandardConfiguration()
      .withBaseUrl(process.env.BackendUrl);
    });
    // storedUser = this.getUser();
    // return storedUser;
  }
  
  getUser(uid){
    if (this.storedUser !== null){
      //TODO: Test to see if this is supposed to be this.storedUser
      return Promise.resolve(this.stored_user);
    }
    this.httpClient.fetch('/user/' + uid)
    .then(response => response.json())
    .then(data => {
      this.storedUser = data;
    });
    return storedUser;
  }
  getUser(){
    if (this.storedUser){
      return storedUser;
    }
    throw 'User does not exist';
  }
  clearUser(){
    storedUser = null;
  }
}
