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

    console.log(routingContext.config);

    // if we need to authenticate / authorize, verify the logged in users roles here.
    if(routingContext.config.auth && routingContext.config.roles){
      console.log('I am authing and have roles');
      for (var i = 0; i < routingContext.config.roles.length; i++) {

        // in this case the user is only in one role at a time.
        if(currentUser.userType.toLowerCase() === routingContext.config.roles[i].toLowerCase())
        {
          console.log('YAY! authorized.');
          return next();
        }
      }

      //log.warning('not authorized');
      console.log('I should be rejecting access by the time I get here');
      return next.cancel();
    }

    console.log('I did not get auth nor roles, so everybody is all good');
    routingContext.getAllInstructions();
    return next();
  }

}
