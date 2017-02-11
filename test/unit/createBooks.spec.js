import {CreateBookDashboard} from '../../src/dashboard-routes/bookstore-routes/createBooks';
import {HttpClient} from 'aurelia-fetch-client';
import './setup';
import {Router} from 'aurelia-router';
import {csvFixture} from './createBooks.spec.fixtures';
import csvjson from 'csvjson';


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
            } else{
                this.header.method = object.method
                this.status = 200
                return Promise.resolve({
                    Headers: this.header,
                    status: this.status,
                    data: object.body
                })
            }
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

});
