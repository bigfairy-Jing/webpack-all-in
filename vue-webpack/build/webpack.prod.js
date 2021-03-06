const path = require('path')

const WebpackMerge = require('webpack-merge')

const webpackConfig = require('./webpack.config')

const CopyWebpackPlugin = require('copy-webpack-plugin')

const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = WebpackMerge(webpackConfig, {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  plugins: [
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, '../public'),
      to: path.resolve(__dirname, '../dist')
    }]),
  ],
  optimization: {
    minimizer: [
      // new UglifyJsPlugin({
      //     uglifyOptions: {
      //       catch: true,
      //       parallel: true,
      //       sourceMap: true
      //     }
      //   }
      // ),
      new OptimizeCssAssetsPlugin({}),
    ],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        libs: {
          name: 'chunk-libs',
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: 'initial'
        }
      }
    }
  },
})