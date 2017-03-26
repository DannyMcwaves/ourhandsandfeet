import {AuthorizeStep} from 'aurelia-auth';
import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {UserAccess} from './classes/UserAccess.js';

@inject(Router, UserAccess)
export class AppRouterConfig{
  constructor(router){
    this.router = router;
  }
  configure(config1, router){
    let theAppRouterConfig = function(config){
      config.title = 'Our Hands and Feet';

      config.addPipelineStep('authorize', AuthorizeStep);
      config.addPipelineStep('authorize', UserAccess); // Is the actually Authorization. Prevents users from certain sites when not authorized.
      config.map([
        { route: ['', 'home'], name: 'home', moduleId: './home', nav: true, title: 'About', settings: 'fa fa-home' },
        { route: 'news', name: 'news', moduleId: './news', nav: true, title: 'News', settings: 'fa fa-file-text-o' },
        { route: 'login', name: 'login', moduleId: './login', nav: false, title: 'Login', settings: 'fa fa-sign-in'},
        { route: 'dashboard', name: 'dashboard-router', moduleId: './dashboard-router', nav: false, title: 'Dashboard', auth: true, settings: 'fa fa-tachometer'}
      ]);
      config.fallbackRoute('/');
    };
    
    this.router.configure(theAppRouterConfig);
  }
}
