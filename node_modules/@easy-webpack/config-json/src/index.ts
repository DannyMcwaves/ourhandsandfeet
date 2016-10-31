import {WebpackConfig, get} from '@easy-webpack/core'
import * as path from 'path'

/**
 * Json loader support for *.json files.
 * See: https://github.com/webpack/json-loader
 */
export = function json({exclude = null} = {}) {
  return function json(this: WebpackConfig): WebpackConfig {
    return {
      module: {
        loaders: get(this, 'module.loaders', []).concat([{
          test: /\.json$/i,
          loader: 'json',
          exclude: exclude || (this.metadata.root ? [path.join(this.metadata.root, 'node_modules')] : []),
        }])
      }
    }
  }
}