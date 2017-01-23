import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';

@inject(HttpClient)
export class CreateBookDashboard {
  constructor(httpClient){
    this.httpClient = httpClient;
    if (process.env.NODE_ENV === 'production') {
      this.fetchURL = 'http://ourhandsandfeetbackend.herokuapp.com';
    } else {this.fetchURL = window.env.LocalBackendUrl; }
    this.newBook = {
      "title":"",
      "type":0,
      "author":"",
      "pages":0,
      "year":0,
      "url":"",
      "catalogNumba":""
    };
    console.log(this.newBook);
  }
  types=["Paperback", "PDF"];
  newBook = null;
  CSVurl="";
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
    if(this.CSVurl!=""){
      var data = {"url":this.CSVurl};
      console.log(JSON.stringify(this.CSVurl));
      this.httpClient.fetch(this.fetchURL + "/book/csv", {
        method:"post",
        body: json(data)
      });
    }
  }
}
