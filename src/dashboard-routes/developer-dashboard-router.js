export class DeveloperRouter {

  heading = 'Developer Dashboard';

  configureRouter(config, router) {
    config.map([
      { route: '', name: 'developer-dashboard', moduleId: './developer-dashboard', nav: false, title: 'Developer Dashboard', auth: true},
      { route: 'create-books', name: 'create-books', moduleId: './developer-routes/create-books', nav: false, title: 'Create Books', auth: true},
      { route: 'checkout-books', name: 'checkout-books', moduleId: './developer-routes/checkout-books', nav: false, title: 'Checkout Books', auth: true},
      { route: 'bookshelf', name: 'Bookshelf', moduleId: './developer-routes/bookshelf', nav: false, title: 'Bookshelf', auth: true, settings: 'fa fa-book'}
    ]);

    this.router = router;
  }
}
