import {App} from '../../src/app';

//
// class AppStub{
//   constructor(){
//     var authenticated=true;
//     var email='it@it.com';
//     var password='password';
//   }
// }

class AuthStub {
  setToken(token) {
    this.token = token;
  }
  logout(data) {
    //Logout
    var response = 'user logged out';
    return new Promise((resolve)=>{
      resolve({json: ()=>response});
    });
  }
  getMe() {
    var response = 'This is user data';
    return new Promise((resolve)=>{
      resolve({json: ()=>response});
    });
  }
  getTokenPayload() {
    var response = this.token;
    return new Promise((resolve)=>{
      resolve({json: ()=>response});
    });
  }
  isAuthenticated() {
    this.authenticated = true;
    return this.authenticated;
  }
}
class AuthStub2 {
  setToken(token) {
    this.token = token;
  }
  logout(data) {
    //Logout
    var response = 'user logged out';
    return new Promise((resolve)=>{
      resolve({json: ()=>response});
    });
  }
  getMe() {
    var response = 'This is user data';
    return new Promise((resolve)=>{
      resolve({json: ()=>response});
    });
  }
  getTokenPayload() {
    var response = this.token;
    return new Promise((resolve)=>{
      resolve({json: ()=>response});
    });
  }
  isAuthenticated() {
    this.authenticated = false;
    return this.authenticated;
  }
}

class RouterStub {
  configure() {

  }
}

class HttpStub {
  configure(){
    httpConfig => {};
  }
  }

describe('the App module', () => {
  var app1;
  var app2;
  beforeEach(() => {
    app1 = new App(null, null, new AuthStub(), new RouterStub(), new HttpStub());
    app1.auth.setToken('No token');
    app2 = new App(null, null, new AuthStub2(), new RouterStub(), new HttpStub());
    //app2.auth.setToken('No token');
  });
  it('the user id should be undefined from getUser function when not authenticated', ()=> {
    app2.getUser();
    expect(app2.uid).toBe(undefined);
      // console.log("user response:" + response.json());
    //expect(response.toBe(''));
  });
  // it('tests getToken', ()=> {
  //   app1.auth.setToken('abcdefg');
  //   app1.getTokens().then((response)=>{
  //     expect(response.json()).toBe('abcdefg');
  //   });
  // });

  // it('tests activate', () => {
  //   app1.activate();
  //     //console.log("App Activate: " + app1.authenticated);
  //   expect(app1.authenticated).toBe(true);
  // });


  it('tests logout', () => {
    //console.log(app1);
    app1.activate();
    app1.logout();
    expect(app1.authenticated).toBe(false);
  });

  it('tests configHttpClient', () => {
    app2.configHttpClient();
    expect(app2.authenticated).toBe(false);
  });
});
