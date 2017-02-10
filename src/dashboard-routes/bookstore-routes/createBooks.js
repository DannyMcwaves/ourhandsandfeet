import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
import {Router} from 'aurelia-router';
const csvjson = require('csvjson');


@inject(HttpClient, Router)
export class CreateBookDashboard {
  constructor(httpClient, router){
    this.httpClient = httpClient;
    this.router = router;
    this.newBook = {
      'title': '',
      'type': 'book',
      'author': '',
      'numberPages': 0,
      'dateOfPub': 0,
      'url': '',
      'isbn': '',
      'siteLocation': '',
      'numberOfCopies': 0,
      'comments': ''
    };
  }

  types = ['book', 'pdf', 'webpage', 'audiobook', 'gdoc'];
  CSVFilePath = {files: ['']};
  fileList = '';

  createBook(){
    if (this.newBook.type !== 0){
      this.newBook.type = this.types[this.newBook.type - 1];
    } else {
      this.newBook.type = 'book';
    }

    this.httpClient.fetch(process.env.BackendUrl + '/book/', {
      method: 'post',
      body: json(this.newBook)
    })
    .then(data=>{
      this.router.navigate('/bookshelf');
  }, undefined);

  }

  createBooksFromCSV(){
    let jsonObj;
    const httpClient = this.httpClient;
    const router = this.router;

    // FILE READER is loaded.
    // evt.target has a result property signifying the data to be returned.
    // convert that string of data to object.
    //and then send a json format of that data backend.
    function loaded (evt) {
      const fileString = evt.target.result;
      // csvjson.toObject takes the csv and then returns an object.
      jsonObj = csvjson.toObject(fileString);
      makeLotaBooks(jsonObj);
    }

    // FILE READER THROWS AN ERROR
    //event.target raises and error
    // if so, handle the error thrown.
    function errorHandler(evt) {
      if (evt.target.error.name === 'NotReadableError') {
        alert('The file could not be read');
      }
    }


    // this function posts the book to the BackendUrl.
    // expects a response and when there is a response, it navigates to the bookshelf.
    function makeLotaBooks (jsonObject) {
      httpClient.fetch(process.env.BackendUrl + '/book/', {
        method: 'post',
        body: json(jsonObject)
      })
      .then(data=>{
        router.navigate('/bookshelf');
    }, undefined);
    }
    if (this.CSVFilePath.files[0] !== ''){
      // TODO: Parse all csv files
      // TODO: add check for browser support of FileReader
      let reader = new FileReader();
      reader.readAsText(new Blob(this.CSVFilePath.files));
      reader.onload = loaded;
      reader.onerror = errorHandler;
    }
  }
}
