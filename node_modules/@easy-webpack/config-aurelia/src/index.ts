import {WebpackConfigWithMetadata, get} from '@easy-webpack/core'
const AureliaWebpackPlugin = require('aurelia-webpack-plugin')

export = function aurelia({root = '', src = '', title = 'Aurelia', baseUrl = '/'} = {}) {
  const allOptions = arguments[0]
  return function aurelia(this: WebpackConfigWithMetadata): WebpackConfigWithMetadata {
    return {
      metadata: {
        title,
        baseUrl,
        root,
        src,
      },
      resolve: {
        modules: [src].concat(get(this, 'resolve.modules', ['node_modules']))
      },
      plugins: [
        new AureliaWebpackPlugin(allOptions)
      ].concat(get(this, 'plugins', []))
    }
  }
}