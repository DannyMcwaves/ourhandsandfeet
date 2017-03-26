
export class DashboardRouter {
  heading = 'Dashboard Router';
  configureRouter(config, router) {
   config.map([
      { route: '', name: 'dashboard', moduleId: './dashboard-routes/dashboard', nav: false, title: 'Dashboard', auth: true, roles: ['volunteer', 'charity', 'developer']},
      { route: 'volunteer', name: 'volunteer', moduleId: './dashboard-routes/volunteer-dashboard', nav: false, title: 'Volunteer', auth: true, roles: ['volunteer']},
      { route: 'charity', name: 'charity', moduleId: './dashboard-routes/charity-dashboard', nav: false, title: 'Charity', auth: true, roles: ['charity']},
      { route: 'developer', name: 'developer', moduleId: './dashboard-routes/developer-dashboard-router', nav: false, title: 'Developer', auth: true, roles:['developer']}
    ]);
    this.router = router;
  }
}
