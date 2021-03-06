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
  mediaTypes = [];
  
  async activate(){
    let backend = '';
    if (process.env.NODE_ENV !== 'production'){
      backend = process.env.BackendUrl;
    }
    await fetch;
    //if (process.env.NODE_ENV !== 'production'){
    this.httpClient.configure(config => {
      config
      .useStandardConfiguration()
      .withBaseUrl(backend);
    });
    //}
    const res = await this.httpClient.fetch('/book/getall');
    this.books =  await res.json();
    this.populateTypes();
  }
  
  attached() {
    this.title = this.router.currentInstruction.config.title;
  }
  filters = [
    {value: '', keys: ['title', 'type', 'author', 'comments']},
    {value: '', keys: ['type']}
  ];
  
  populateTypes(){
    this.mediaTypes.push('');
    for (let next of this.books){
      let nextType = next.type;
      /* istanbul ignore else */
      if (this.mediaTypes.indexOf(nextType) === -1){
        this.mediaTypes.push(nextType);
      }
    }
  }
}
