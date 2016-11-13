import {AuthorizeStep} from 'aurelia-auth';
import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

@inject(Router)
export default class{

	constructor(router){
		this.router = router;
	}
	configure(){
		var appRouterConfig = function(config){
      config.title = 'Our Hands and Feet';
      config.addPipelineStep('authorize', AuthorizeStep);
      config.map([
        { route: ['', 'home'], name: 'home',      moduleId: './home',      nav: true, title: 'About' },
        { route: 'news',         name: 'news',        moduleId: './news',        nav: true, title: 'News' },
				{ route: 'login',         name: 'login',        moduleId: './login',        nav: false, title: 'Login'},
				{ route: 'dashboard',         name: 'dashboard',        moduleId: './dashboard',        nav: false, title: 'Dashboard', auth:true}

        // { route: 'jobs',  name: 'jobs', moduleId: './jobs', nav: true, title: 'Jobs' }
      ]);
    };

		this.router.configure(appRouterConfig);
	}

}
