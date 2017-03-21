// import 'bootstrap';
import {inject, bindable} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {AppRouterConfig} from './app.router.config';
import {FetchConfig} from 'aurelia-auth';
import {AuthService} from 'aurelia-auth';
//import {User} from './classes/user';
//import {AuthorizeStep} from 'aurelia-router';
import {HttpClient} from 'aurelia-fetch-client';
System.import('isomorphic-fetch');
@inject(Router, FetchConfig, AuthService, AppRouterConfig, HttpClient)
export class App {
  constructor(router, fetchConfig, auth, appRouterConfig, httpClient){
    this.router = router;
    this.appRouterConfig = appRouterConfig;
    this.fetchConfig = fetchConfig;
    this.auth = auth;
    this.httpClient = httpClient;
    this.user = this.getUser();
  }
  @bindable
  drawerWidth = '175px';
  
  @bindable
  fullmenu = true;
  
  email='';
  password='';
  authenticated = false;
  token='';
  
  get widescreen(){
    let iswidescreen = false;
    let currentscreenwidth = document.documentElement.clientWidth;
    /* istanbul ignore else */
    if (currentscreenwidth > 766){
      iswidescreen = true;
    }
    return iswidescreen;
  }
  
  togglemenu(){
    if (this.fullmenu) {
      this.fullmenu = false;
      this.drawerWidth = '50px';
      // this.leftMargin = '55px';
      // if (this.screenWidth > 766)
    } else {
      this.fullmenu = true;
      this.drawerWidth = '175px';
      // this.leftMargin = '165px';
    }
  }
  
  logout(){
    this.auth.setToken('');
    this.authenticated = false;
    this.auth.logout('#/');
  }
  
  getUser(){
    // return this.auth.getMe().then((response)=>{console.log("get me:" + response);return response;});
    this.authenticated = this.auth.isAuthenticated();
    if (this.authenticated) {
      const uid = this.getTokens().sub;
      let backend = '';
      if (process.env.NODE_ENV !== 'production'){
        backend = process.end.BackendUrl;
      }
      this.httpClient.fetch(backend + '/user/' + uid)
      .then(response => response.json())
      .then(data => {
        //'this' means app?
        this.user = data;
      });
    } else {
      return '';
    }
  }
  
  getTokens(){
    return this.auth.getTokenPayload();
  }
  activate() {
    this.appRouterConfig.configure();
    this.configHttpClient();
    //this.getUser();
  }
  
  configHttpClient(){
    this.httpClient.configure(httpConfig => {
      httpConfig
      .withDefaults({
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
          'Accept': 'application/json'
        }
      })
      .withInterceptor(this.auth.tokenInterceptor);
    });
  }
  
}
