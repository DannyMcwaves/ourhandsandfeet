import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';

//import { bindable } from 'aurelia-framework';

const fetch = !self.fetch ? System.import('isomorphic-fetch') : Promise.resolve(self.fetch);
//const booksUrl = process.env.BackendUrl + '/book/getall';

@inject(HttpClient)
export class Bookshelf {

    constructor(HttpClient) {
        this.http = HttpClient;
    }

    async activate() {
        await fetch;
        const res = await this.http.fetch('/book/getall');
        this.books = await res.json();
    }
}
