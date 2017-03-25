// we want font-awesome to load as soon as possible to show the fa-spinner
import '../styles/styles.css';
import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';
import config from '../authConfig';
//var ap = require('aurelia-polymer');
// comment out if you don't want a Promise polyfill (remove also from webpack.common.js)

import * as Bluebird from 'bluebird';
Bluebird.config({warnings: false});

export async function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .feature('components')
    .plugin('aurelia-polymer')
    .plugin('aurelia-auth', (baseConfig) => {
      baseConfig.configure(config);
    });

  document.addEventListener('WebComponentsReady', function () {
    aurelia.start().then(() => aurelia.setRoot('app'));
  });
}
