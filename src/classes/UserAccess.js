import {inject} from 'aurelia-framework';
import {AppState} from '../classes/AppState.js';

@inject(AppState)
export class UserAccess {
  constructor(appState){
    this.appState = appState;
  }

  run(routingContext, next) {
    console.log('Hey, I am trying to stop peoples');
    const currentUser = this.appState.getUser();
    console.log(currentUser);
    console.log(routingContext);
    console.log(this.appState.getRoles());
    if(routingContext.config.auth && routingContext.fragment == "/dashboard" && this.appState.getAuth()){
      return next();
    }
    // if we need to authenticate / authorize, verify the logged in users roles here.
    if(routingContext.config.auth && this.appState.getRoles().length > 0){
      console.log('I am authing and have roles');
      var temp_roles = this.appState.getRoles();
      for (var i = 0; i < temp_roles.length; i++) {
        // in this case the user is only in one role at a time.
        if(routingContext.params.childRoute === temp_roles[i].toLowerCase())
        {
          console.log('YAY! authorized.');
          return next();
        }
      }

      //log.warning('not authorized');
      console.log('I should be rejecting access by the time I get here');
      return next.cancel();
    }
    else if(routingContext.config.auth){
      return next.cancel();
    }
    

    console.log('I did not get auth nor roles, so everybody is all good');
    routingContext.getAllInstructions();
    return next();
  }

}
