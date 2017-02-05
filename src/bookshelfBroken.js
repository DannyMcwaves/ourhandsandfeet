// import {inject} from 'aurelia-framework';
// import {HttpClient, json} from 'aurelia-fetch-client';
//
// const fetch = !self.fetch ? System.import('isomorphic-fetch') : Promise.resolve(self.fetch);
// const booksUrl = process.env.BackendUrl + '/book/getall';
//
// @inject(HttpClient)
// export class Bookshelf {
//   books = [];
//
//   constructor(getHttpClient){
//     this.getHttpClient = getHttpClient;
//   }
//
//   async activate(){
//     await fetch;
//     const http = this.http = this.getHttpClient();
//
//     http.configure(config => {
//       config
//         .useStandardConfiguration()
//         .withBaseUrl(booksUrl);
//     });
//
//     const respose = await http.fetch();
//     this.books = await response.json();
//
//   }
// }
