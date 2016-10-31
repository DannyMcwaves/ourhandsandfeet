import {WebpackConfig, get} from '@easy-webpack/core'
import * as path from 'path'

/**
 * HTML loader support for *.html
 * Returns file content as string, loads required images.
 *
 * See: https://github.com/webpack/html-loader
 */
export = function html({exclude = null} = {}) {
  return function html(this: WebpackConfig): WebpackConfig {
    return {
      module: {
        loaders: get(this, 'module.loaders', []).concat([{
          test: /\.html$/,
          loader: 'html',
          exclude: exclude || (this.metadata.root ? [path.join(this.metadata.root, 'index.html')] : []),
        }])
      }
    }
  }
}