import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';

@inject(HttpClient)
export class CreateBookDashboard {
  constructor(httpClient){
    this.httpClient = httpClient;
    if (process.env.NODE_ENV === 'production') {
      this.fetchURL = 'http://ourhandsandfeetbackend.herokuapp.com';
    } else {this.fetchURL = 'http://localhost:7000'; }
    this.newBook = {
      "title":"",
      "type":"",
      "author":"",
      "numberPages":0,
      "dateOfPub":0,
      "url":"",
      "isbn":"",
      "siteLocation":"",
      "numberOfCopies":0,
      "comments":""
    };
    console.log(this.newBook);
  }
  types=["Book", "PDF", "Webpage", "Audiobook"];
  newBook = null;
  CSVFilePath="";
  fileList="";

  createBook(){
    console.log(this.newBook);
    if(this.newBook.type != 0){
      this.newBook.type=this.types[this.newBook.type-1];
    }else{
      this.newBook.type="None chosen";
    }
    this.httpClient.fetch(this.fetchURL + "/book/", {
      method:"post",
      body:json(this.newBook)
    })
    .then(response=>response.json())
    .then(data=>{
      console.log("Posted data");
      console.log(data);
    });
  }

  createBooksFromCSV(){
const httpClient = this.httpClient;
const fetchURL = this.fetchURL;

    if(CSVFilePath.files!=""){
      var jsonObj;
      //TODO: Parse all csv files

      function loaded (evt) {
        var fileString = evt.target.result;
        console.log (fileString);
        const csvjson = require('csvjson');
        jsonObj = csvjson.toObject(fileString);
        console.log ('json created ' + JSON.stringify(jsonObj));
        makeLotaBooks(jsonObj);

      }

      function errorHandler(evt) {
        if(evt.target.error.name == "NotReadableError") {
          alert('The file could not be read');
        }
      }
// TODO: add check for browser support of FileReader
      var reader = new FileReader();
      reader.readAsText(CSVFilePath.files[0]);
      reader.onload = loaded;
      reader.onerror = errorHandler;

      //var jsonString =
      function makeLotaBooks (jsonObject) {
        console.log('about to make lotta books' + JSON.stringify(jsonObject));
        var jstring = JSON.stringify(jsonObject);
        var jsonobj = JSON.parse(jstring);
      httpClient.fetch(fetchURL + "/book/", {
        method:"post",
        body:json(jsonobj)
      })
      .then(response=>response.json())
      .then(data=>{
        console.log("Posted data");
        console.log(data);
      });
    }
  }
}
}
