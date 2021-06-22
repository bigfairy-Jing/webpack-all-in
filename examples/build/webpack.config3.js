// 多页面
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanPlugin } = require('webpack')
const MiniCssExtractplugin = require('mini-css-extract-plugin')

const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
let indexLess = new ExtractTextWebpackPlugin('index.less');
let indexCss = new ExtractTextWebpackPlugin('index.css');

module.exports = {
  mode: "development",
  entry: {
    main: ["@babel/polyfill", path.resolve(__dirname, '../src/index.js')], ,
  },
  output: {
    filename: '[name].[hash:8].js',      // 打包后的文件名称
    path: path.resolve(__dirname, '../dist')  // 打包后的目录
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            preset: ['@babel/preset-env']
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader',
          indexCss.extract({
            use: ['css-loader']
          })] // 从右向左解析原则
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          indexLess.extract({
            use: ['css-loader', 'less-loader']
          })
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [require('autoprefixer')]
            }
          },
          'less-loader'
        ] // 从右向左解析原则
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      filename: 'index.html',
      chunks: ['main'] // 与入口文件对应的模块名称
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[hash].css",
      chunkFilename: "[id].css",
    }),
    new CleanPlugin()
  ]
}

