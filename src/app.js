// import 'bootstrap';
import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {FetchConfig} from 'aurelia-auth';
@inject(Router,FetchConfig)
export class App {
  constructor(router, fetchConfig, auth){
    this.router = router;
    this.fetchConfig = fetchConfig;
    this.auth=auth;
      }
  email='';
  password='';

    login(){
          return this.auth.login(this.email, this.password)
          .then(response=>{
              console.log("success logged " + response);
          })
          .catch(err=>{
              console.log("login failure");
          });
      };

    authenticate(name){
          return this.auth.authenticate(name, false, null)
          .then((response)=>{
              console.log("auth response " + response);
          });
      }


  activate(){
    this.fetchConfig.configure();
  }

  configureRouter(config, router) {
    config.title = 'Tipsy Ryde';
    config.map([
      { route: ['', 'home'], name: 'home',      moduleId: './home',      nav: true, title: 'Home' },
      { route: 'services',         name: 'services',        moduleId: './services',        nav: true, title: 'Services' },
      { route: 'jobs',  name: 'jobs', moduleId: './jobs', nav: true, title: 'Jobs' }
    ]);

    this.router = router;
  }
}
