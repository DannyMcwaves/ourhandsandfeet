export class AppState {
  constructor(){
    this.user = {};
  }
  
  getUser(){
    console.log('appState');
    console.log(this.user);
    return this.user;
  }
  setUser(input){
    console.log('appState');
    console.log(this.user);
    this.user = input;
  }
  
}
