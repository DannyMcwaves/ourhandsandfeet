import {inject} from 'aurelia-framework';
import {AppState} from '../classes/AppState.js';

@inject(AppState)
export class UserAccess {
  constructor(appState){
    this.appState = appState;
  }
  
  run(navigationInstruction, next){
    //TODO: Get type of user from shared state
    let user = this.appState.getUser();
    
    //TODO: Determine the route destination. Probably get it from NavigationInstruction? 
    //if (navigationInstruction.getAllInstructions().some(i => {}))
    navigationInstruction.fragment = '/dashboard/volunteer';
    console.log(navigationInstruction); //Testing to try to get navigationInstruction. Set a breakpoint here!
    // const endPoint
    const userType = 'placeholder';
    const endpoint = 'foo';
    
    //This might break, but we just need a method to test if this endpoint value exists
    // if (userRouteAccess[userType].destination[endpoint]){
    //   //If it does, we cancel our original destination, and send it to the new userType specific one
    //   return next.cancel(new Redirect(userRouteAccess[userType].destination[endpoint]));
    // } else {
    //If the destination is not mapped, cancel the navigationInstruction
    return next();
    // }
    //It should probably not reach here
    // throw new Error('userAccess is leaking');
    // return next();
  }
}

const userRouteAccess = {
  'charity': {
    'allowedRoutes': [
      'charity'
    ],
    'restrictedRoutes': [],
    'destination': {
      'dashboard': 'charityDashboard'
    }
  },
  'volunteer': {
    'allowedRoutes': [],
    'restrictedRoutes': []
  },
  'developer': {
    'allowedRoutes': [],
    'restrictedRoutes': []
  }
};
