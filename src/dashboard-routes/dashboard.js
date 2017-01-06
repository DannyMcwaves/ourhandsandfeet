//import 'bootstrap';
import {inject} from 'aurelia-framework';
import {App} from '../app';
//import {Router} from 'aurelia-router';
//import DashboardRouterConfig from "./dashboard-router";
//import {FetchConfig} from 'aurelia-auth';
import {AuthService} from "aurelia-auth";
import {HttpClient, json} from 'aurelia-fetch-client';
//import {AuthorizeStep} from 'aurelia-router';
//@inject(Router,FetchConfig, AuthService, AppRouterConfig)
@inject(AuthService, HttpClient, App)
export class Dashboard {
  constructor(auth, httpClient, app){
    this.app = app;
    this.auth = auth;
    this.httpClient = httpClient;

      }
  //
  authenticated=false;
  //user={};
  first_time_info = false;
  types=["Charity", "Volunteer"];
  // types=[];
  // types["Charity"]="Charity";
  // types["Volunteer"]="Volunteer";
  getUser(){
    console.log('dashboard.getUser()');
    console.log(this.app.user);

    if(this.app.user !== undefined ){
      console.log('User already exists!');
      console.log(this.app.user);
      return;
    }
    // console.log(this.auth);
    // return this.auth.getMe().then((response)=>{console.log("get me:" + response);return response;});
    this.authenticated = this.auth.isAuthenticated();
      var uid = this.auth.getTokenPayload().sub;
      this.httpClient.fetch('http://localhost:7000/user/'+uid)
        .then(response => response.json())
        .then(data => {
          console.log('dashboard.getUser()');
          console.log(this);
            this.user = data;
            console.log("foo"+this.user);
            this.first_time_info = this.configured();
            if(this.user.userType == "Charity"){
              this.user.userType = 1;
            }else if(this.user.userType == "Volunteer"){
              this.user.userType = 2;
            }
            console.log("Dashboard user data");
            console.log(this.user);
            console.log("First time info:");
            console.log(this.first_time_info);
        })
  }

  updateUser(){
    var uid = this.auth.getTokenPayload().sub;
    console.log(this.user);
    var tempUserType = this.user.userType;
    console.log(tempUserType);
    this.user.userType=this.types[this.user.userType-1];
    console.log(this.user.userType);
    this.httpClient.fetch("http://localhost:7000/user/"+uid, {
      method:"put",
      body:json(this.user)
    })
    .then(response=>response.json())
    .then(data=>{
      console.log("Updated data");
      console.log(data);
      this.user.userType=tempUserType;
    });
  }

  configured(){
    var return_val = false;
      if(!('phone' in this.user) && !("level" in this.user)){
        console.log("Not valid configured user");
      }else{
        console.log("Valid configured user");
        return_val = true;
      }
      return return_val;
    }


  activate(){

    this.getUser();
    //this.first_time_info = this.configured();
  }
//function getName

//function updateUser
}
