import {CreateBookDashboard} from '../../src/dashboard-routes/bookstore-routes/createBooks';
import {HttpClient} from 'aurelia-fetch-client';
import './setup';
import {Router} from 'aurelia-router';
import {csvFixture} from './createBooks.spec.fixtures';
import csvjson from 'csvjson';


/*
class HttpStub extends HttpClient {
  status = 500;
  statusText;
  object = {};
  returnKey;
  returnValue;
  responseHeaders = [];

  fetch(input, init) {
    let request;
    //let response;
    let responseInit = {};
    responseInit.headers = new Headers();

    for (let name in this.responseHeaders || {}) {
      responseInit.headers.set(name, this.responseHeaders[name]);
    }

    responseInit.status = this.status || 200;

    if (Request.prototype.isPrototypeOf(input)) {
      request = input;
    } else {
      request = new Request(input, init || {});
    }
    if (request.body && Blob.prototype.isPrototypeOf(request.body) && request.body.type) {
      request.headers.set('Content-Type', request.body.type);
    }

    let promise = Promise.resolve();
    // .then( () => {
    //   if (request.headers.get('Content-Type') === 'application/json' && request.method !== 'GET') {
    //     return request.json().then(object => {
    //       object[this.returnKey] = this.returnValue;
    //       let data = new Blob([JSON.stringify(this.object)]);
    //       response = new Response(data, responseInit);
    //       return this.status >= 200 && this.status < 300 ? Promise.resolve(response) : Promise.reject(response);
    //     });
    //   }
    //   let data = new Blob([JSON.stringify(this.object)]);
    //   response = new Response(data, responseInit);
    //   return this.status >= 200 && this.status < 300 ? Promise.resolve(response) : Promise.reject(response);
    // });
    return promise;
  }
}

class RouterStub extends Router {

  navigate(destination) {
    return this.router.destination = destination;
    // return new Promise((resolve)=>{
    //   resolve({json: ()=>response});
    // });
  }
}
*/


class HttpMock {
  status = 500;
  header = {accept: 'application/json', url: '', method: ''}
  response = ''
  fetch(data, object) {
        // data should be the path when calling the fecth method.
        // see the log to ensure the methods are being called.
      if (data) {
          this.header.url = data;
          if (object.method === 'GET') {
              this.header.method = object.method;
              this.status = 200;
              return Promise.resolve({
                  Headers: this.header,
                  status: this.status,
                  data: object.body
                });
            }  
                this.header.method = object.method
                this.status = 200
                return Promise.resolve({
                    Headers: this.header,
                    status: this.status,
                    data: object.body
                })
            
          return Promise.resolve({
              Headers: this.header,
              status: this.status,
              data: response
            });
        }
      return Promise.resolve({
          Headers: this.header,
          status: this.status,
          data: 'PLEASE SPECIFY A URL'
        });
    }
}

class RouterMock {
  navigate(route) {
        // for testing purposes, let us check if route is really returned.
        // or even called at all.
      return route;
    }
}

describe('the createBook module', () => {
  let bookdashboard, http, router, fileReaderStub;
  beforeEach(() => {
      http = new HttpMock(),
        router = new RouterMock(),
        fileReaderStub = {},
        bookdashboard = new CreateBookDashboard(http, router, fileReaderStub);
        // add the new book csv from the fixtures object and use it as main data.
      bookdashboard.CSVFilePath = {files: [csvFixture.string]};
    });
  it('should parse the csv.fixtures into object', done => {
      let object = csvjson.toObject(bookdashboard.CSVFilePath.files[0]);
      expect(object instanceof Array).toBeTruthy();
      done();
    });

    // it("should confirm 200 http status after createBooksFromCSV is run", done => {
    //     bookdashboard.createBooksFromCSV();
    //     // wait a few seconds after the main fucntion is called to confirm a change in https status.
    //     setTimeout(function () {
    //         expect(http.status).toEqual(200);
    //         done();
    //     }, 5);
    //     // console.log(http.status);
    // })

  it('should confirm 200 https status after createBook is run', done => {
      bookdashboard.createBook();
      expect(http.status).toBe(200);
      done();
    });

  /*
  beforeEach(() => {
    httpStub = new HttpStub();
    routerStub = new RouterStub();
    fileReaderStub = {};
    sut = new CreateBookDashboard( httpStub, routerStub, fileReaderStub ); //We're using DI for our HttpClient
    sut.httpClient.status = 200; //we'll check for errors later
    sut.httpClient.object = {id: '1', artist: 'Prince', record: 'Purple Rain'}; //this is what we expect to from the GET
    sut.httpClient.returnKey = 'date'; //key returned from PUT/CREATE/POST
    sut.httpClient.returnValue = '6/24/1984'; //value returned from PUT/CREATE/POST
    sut.httpClient.responseHeaders = {accept: 'json'};
  });

  xit('should post a new book from the form data', () => {
    sut.newBook = {'title': 'testTitle', 'type': 'pdf'};
    sut.createBook();
    //expect(this.Res.status).toEqual(201);
    //done();
  });

  xit('should post a new book from the form data as type equals book if a type is not defined', () => {
    sut.newBook = {'title': 'howdy', 'type': 0};
    sut.createBook();
    //expect(record).toEqual({"title":"testTitle","id":"1","type":"pdf", date: '6/24/1984'})
    //done();
  });

*/

  it('should convert from csv and then post that array of books', (done) => {
    fileReaderStub.readAsText = () => {};
    global.CSVFilePath = { files: [csvFixture.string] };
    bookdashboard.createBooksFromCSV();
    bookdashboard.httpClient.fetch = (url, {body: blob}) => {
      const reader = new FileReader();
      reader.onload =  () => {
        const data = new TextDecoder('utf8').decode(reader.result);
        expect(JSON.parse(data)).toEqual(csvFixture.json);
        done();
      };
      reader.readAsArrayBuffer(blob);
      return new Promise(()=>{}); // don't resolve
    };
    fileReaderStub.onload({ target: { result: csvFixture.string } });
  });

/*

  // it('displays an modal to the user when a record cannot be saved', (done) => {
  //   sut.http.status = 400
  //   sut.http.statusText = "Record Not Found"
  //
  //   spyOn(sut, "popModel")
  //
  //   sut.save(sut.http.object).catch( (error) => { //notice we use a catch here.
  //     expect(error.status).toEqual(400)
  //     expect(sut.popModel).toHaveBeenCalledWith("Unable to Save Record", error.statusText)
  //     done()
  //   })
  // })
  */
});
