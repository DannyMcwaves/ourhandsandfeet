import {WebpackConfigWithMetadata, get} from '@easy-webpack/core'
import * as webpack from 'webpack'

export = function bluebird({expose = true} = {}) {
  return function bluebird(this: WebpackConfigWithMetadata): WebpackConfigWithMetadata {
    const config = {
      plugins: [
        new webpack.ProvidePlugin({
          'Promise': 'bluebird',
        })
      ].concat(get(this, 'plugins', []))
    } as WebpackConfigWithMetadata

    if (expose) {
      config.module = {
        loaders: get(this, 'module.loaders', []).concat([
          { test: /[\/\\]node_modules[\/\\]bluebird[\/\\].+\.js$/, loader: 'expose?Promise' }
        ])
      }
    }
    return config
  }
}