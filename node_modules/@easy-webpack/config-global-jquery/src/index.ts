import {WebpackConfigWithMetadata, get} from '@easy-webpack/core'
import * as webpack from 'webpack'

export = function jQuery({expose = true} = {}) {
  return function jQuery(this: WebpackConfigWithMetadata): WebpackConfigWithMetadata {
    const config = {
      plugins: [
        new webpack.ProvidePlugin({
          '$': 'jquery',
          'jQuery': 'jquery',
          'window.jQuery': 'jquery' // this doesn't expose jQuery property for window, but exposes it to every module
        })
      ].concat(get(this, 'plugins', []))
    } as WebpackConfigWithMetadata

    if (expose) {
      config.module = {
        loaders: get(this, 'module.loaders', []).concat([
          { test: require.resolve('jquery'), loader: 'expose?$!expose?jQuery' }
        ])
      }
    }
    return config
  }
}
