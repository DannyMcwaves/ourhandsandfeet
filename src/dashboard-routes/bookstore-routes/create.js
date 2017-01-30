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
  types=["Book", "PDF", "Webpage"];
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
//         const csvFilePath=this.CSVurl
//         const csv=require('csvtojson')
//         csv()
//         .fromFile(csvFilePath)
//         .on('json',(jsonObj)=>{
//     // combine csv header row and csv line to a json object
//     // jsonObj.a ==> 1 or 4
// })
// .on('done',(error)=>{
//     console.log('end')
//     console.log(jsonObj)
//     this.httpClient.fetch(this.fetchURL + "/book/", {
//       method:"post",
//       body: json(jsonObj)
//         })
//       });
    }
  }
}
