var path = require('path')
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
  entry: './src/index',
  output: {
    path: path.resolve('out'),
    filename: 'bundle.js',
    library: 'MenuComponent',
    libraryTarget: 'umd'
  },
  devServer: {
    contentBase: 'out'
  },
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.tsx?$/,
        loader: 'tslint-loader',
        exclude: /(node_modules)/,
      },
      {
        test: /\.tsx?$/, use: 'ts-loader',
        exclude: /(node_modules)/,
      },
    ],
  },
  plugins: [
    new OpenBrowserPlugin({ url: 'http://localhost:8080' })
  ]
}
