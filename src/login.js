
import {AuthService} from 'aurelia-auth';
import {inject} from 'aurelia-framework';
import {App} from './app';
import {Router} from 'aurelia-router';

@inject(AuthService, App, Router)
export class Login {
  
  constructor(authService, app, router){
    this.auth = authService;
    this.app = app;
    this.router = router;
  }
  
  // attached() {
  //   document.title = this.router.currentInstruction.config.title;
  // }
  
  authenticate(name){
    let ret = this.auth.authenticate(name, false, null);
    ret.then(data => {
      this.auth.setToken(data.token);
      this.app.authenticated = this.auth.isAuthenticated();
    }, undefined);
    return ret;
  }
}
