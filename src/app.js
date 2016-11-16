// import 'bootstrap';
import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import AppRouterConfig from "./app.router.config";
import {FetchConfig} from 'aurelia-auth';
import {AuthService} from "aurelia-auth";
import {AuthorizeStep} from 'aurelia-router';
import {HttpClient} from 'aurelia-fetch-client';

@inject(Router,FetchConfig, AuthService, AppRouterConfig, HttpClient)
export class App {
  constructor(router, fetchConfig, auth, appRouterConfig, httpClient){
    this.router = router;
    this.appRouterConfig = appRouterConfig;
    this.fetchConfig = fetchConfig;
    this.auth=auth;
    this.httpClient = httpClient;

      }
  email='';
  password='';
  authenticated = false;
    login(){
          return this.auth.login(this.email, this.password)
          .then(response=>{
              console.log("success logged " + response);
          })
          .catch(err=>{
              console.log("login failure");
          });
      };

    // authenticate(name){
    //   console.log(name);
    //   console.log(this.auth.isAuthenticated());
    //   //console.log(this.getTokens());
    //       return this.auth.authenticate(name, false, null)
    //       .then((response)=>{
    //           console.log("auth response " + response);
    //           console.log(response);
    //           this.auth.setToken(response);
    //           this.authenticated = this.auth.isAuthenticated();
    //
    //           //this.getUser();
    //           //this.getTokens();
    //       });
    //   }

      logout(){
        this.auth.setToken("");
        this.authenticated = false;
        this.auth.logout("#/").then(response=>{console.log("ok logged out");});
      }

      getUser(){

        console.log(this.auth);
        return this.auth.getMe().then((response)=>{console.log("get me:" + response)});
      }

      getTokens(){
        return this.auth.getTokenPayload().then((response)=>{console.log("token payload:"+response)});
      }
  activate(){
    console.log(this.auth.isAuthenticated());
    this.authenticated = this.auth.isAuthenticated();
    this.appRouterConfig.configure();
    this.configHttpClient();
    //this.getUser();
  }

  configHttpClient(){
    this.httpClient.configure(httpConfig => {
      httpConfig
        .withDefaults({
          mode: 'no-cors',
          headers: {
            'Accept': 'application/json'
          }
        })
        .withInterceptor(this.auth.tokenInterceptor);
    });
  }

  // configureRouter(config, router) {
  //   config.title = 'Our Hands and Feet';
  //   config.addPipelineStep('authorize', AuthorizeStep);
  //   config.map([
  //     { route: ['', 'home'], name: 'home',      moduleId: './home',      nav: true, title: 'About' },
  //     { route: 'services',         name: 'services',        moduleId: './services',        nav: true, title: 'News' },
  //     // { route: 'jobs',  name: 'jobs', moduleId: './jobs', nav: true, title: 'Jobs' }
  //   ]);
  //
  //   this.router = router;
  // }

}
