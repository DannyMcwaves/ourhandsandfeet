import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';

//import { bindable } from 'aurelia-framework';

const fetch = !self.fetch ? System.import('isomorphic-fetch') : Promise.resolve(self.fetch);
const booksUrl = process.env.BackendUrl + '/book/getall';

@inject(HttpClient)
export class Bookshelf {
  books = [];

  constructor(getHttpClient){
    this.getHttpClient = getHttpClient;
  }

  async activate(){
    await fetch;
    const http = this.http = this.getHttpClient();

    http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl(booksUrl);
    });

    const respose = await http.fetch();
    this.books = await response.json();

    // this.httpClient.fetch()
    //     .then(response => response.json())
    //     .then(data => {
    //         //console.log("Books:");
    //         console.log(data);
    //         this.books = data;
    //     });
  }
}
