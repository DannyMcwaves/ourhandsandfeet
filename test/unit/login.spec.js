import {Login} from '../../src/login';
class HttpStub {
  fetch(url) {
    var response = this.itemStub;
    this.url = url;
    return new Promise((resolve) => {
      resolve({ json: () => response });
    });
  }
  authenticate(param1, param2, param3){
    var response = this.itemStub;
    this.user = this.itemStub;
    return new Promise((resolve) => {
      resolve({ json: () => response });
    });
  }
  setToken(token){
    this.user = token;
  }
  isAuthenticated(){
    return "Yes";
  }
  configure(func) {
  }
}

class AppStub{
  constructor(){
    var authenticated;
  }
}

describe('the Login module', () => {
  var sut;
  var http;

  beforeEach(() => {
    sut = new Login();
    //console.log(sut);

  });


  // it('sets fetch response to login', (done) => {
  //     var itemStubs = [1];
  //     var itemFake = [2];
  //
  //     var getHttp = () => {
  //       var http = new HttpStub();
  //       http.itemStub = itemStubs;
  //       return http;
  //     };
  //     var app = new AppStub();
  //     // console.log(getHttp);
  //     var sut = new Login(getHttp(), app);
  //     // console.log(sut.auth.isAuthenticated());
  //     // console.log(sut);
  //     sut.authenticate("google").then(() => {
  //       //console.log(sut.user);
  //       //expect(sut.user).toBe(itemStubs);
  //       expect(sut.user).not.toBe(itemFake);
  //       done();
  //     });
  //   });

});
