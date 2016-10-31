import {WebpackConfig, get} from '@easy-webpack/core'

/**
 * @param exclude add paths to packages that have problems with their sourcemaps
 */
export = function externalSourceMaps({exclude = []} = {}) {
  return function externalSourceMaps(this: WebpackConfig): WebpackConfig {
    return {
      module: {
        preLoaders: get(this, 'module.preLoaders', []).concat([{
          test: /\.jsx?$/,
          loader: 'source-map',
          exclude
        }])
      }
    }
  }
}