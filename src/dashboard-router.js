export class DashboardRouter {
  heading = 'Dashboard Router';

  configureRouter(config, router) {
    config.map([
      { route: "",         name: 'dashboard',        moduleId: './dashboard-routes/dashboard',        nav: false, title: 'Dashboard', auth:true},
      { route: "info", name: 'info',       moduleId: './dashboard-routes/info',       nav: true, title: 'Information', auth:true }
    ]);

    this.router = router;
  }
}
