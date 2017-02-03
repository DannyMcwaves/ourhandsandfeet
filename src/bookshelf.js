import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';

//import { bindable } from 'aurelia-framework';
@inject(HttpClient)

export class Bookshelf {
  constructor(httpClient){
    this.httpClient = httpClient;
  }

  //books=[];
  books=null;
  getBooks(){
    this.httpClient.fetch(process.env.BackendUrl + '/book/getall')
        .then(response => response.json())
        .then(data => {
          //console.log("Books:");
          //console.log(data);
          this.books=data;
        });

  }

  // getBook(bookname){
  //
  // }

  activate(){
    this.getBooks();
  }
}
