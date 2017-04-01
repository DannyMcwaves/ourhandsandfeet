//import {computedFrom} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {inject} from 'aurelia-framework';

@inject(Router)
export class Home {
  
  constructor(router) {
    this.router = router;
  }

  get widescreen() {
    return document.documentElement.clientWidth > 980;
  }
  // attached() {
  //     document.title = this.router.currentInstruction.config.title;
  // }
  
  // heading = 'Welcome to the Aurelia Navigation App!';
  // firstName = 'John';
  // lastName = 'Doe';
  // previousValue = this.fullName;
  
  //Getters can't be directly observed, so they must be dirty checked.
  //However, if you tell Aurelia the dependencies, it no longer needs to dirty check the property.
  //To optimize by declaring the properties that this getter is computed from, uncomment the line below
  //as well as the corresponding import above.
  //@computedFrom('firstName', 'lastName')
  // get fullName() {
  //   return `${this.firstName} ${this.lastName}`;
  // }
  //
  // submit() {
  //   this.previousValue = this.fullName;
  //   alert(`Welcome, ${this.fullName}!`);
  // }
  //
  // canDeactivate() {
  //   if (this.fullName !== this.previousValue) {
  //     return confirm('Are you sure you want to leave?');
  //   }
  // }
}
