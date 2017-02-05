import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';

@inject(HttpClient)

export class Bookshelf {
  constructor(httpClient){
    this.httpClient = httpClient;
  }

  books=null;
  getBooks(){
    this.httpClient.fetch(process.env.BackendUrl + '/book/getall')
    .then(response => response.json())
    .then(data => {

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
