import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {Router} from 'aurelia-router';
//import { bindable } from 'aurelia-framework';

//const fetch = !self.fetch ? System.import('isomorphic-fetch') : Promise.resolve(self.fetch);

@inject(HttpClient, Router)
export class Bookshelf {

  constructor(httpClient, router){
    this.httpClient = httpClient;
    this.router = router;
  }

  async activate(){
    await fetch;

    this.httpClient.configure(config => {
      config
      .useStandardConfiguration()
      .withBaseUrl(process.env.BackendUrl);
    });

    const res = await this.httpClient.fetch('/book/getall');
    this.books =  await res.json();
  }

  attached() {
    this.title = this.router.currentInstruction.config.title;
  }
  
}
