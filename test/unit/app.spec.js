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

class RouterStub {
  configure() {

  }
}

class HttpStub {
  configure() {
  }
}

describe('the App module', () => {
  var app1;
  beforeEach(() => {
    app1 = new App(null, null, new AuthStub(), new RouterStub(), new HttpStub());
    app1.auth.setToken('No token');
     //console.log(sut);
  });
  // it('tests getUser', ()=> {
  //   app1.getUser().then((response)=>{
  //     // console.log("user response:" + response.json());
  //     expect(response.json()).toBe('This is user data');
  //   });
  // });
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

  // it('tests configHttpClient', () => {
  //   app1.activate();
  //   expect(app1.authenticated).toBe(false);
  // });
});
