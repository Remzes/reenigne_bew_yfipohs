const path = require('path');
let SharedCache = {}

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './public/index.html',
  filename: 'index.html',
  inject: 'body'
})

module.exports = {
  cache: SharedCache,
  entry: './src/index.js',
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist',
    proxy: {
      '*': {
        target: 'http://localhost:3001',
        secure: false,
        changeOrigin: true
      }
    }
  },
  module: {
    rules: [
      { test: /\.(jpg|png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000', exclude: /node_modules/ },
      { test: /\.(jpg|png|woff|woff2|eot|ttf|svg)$/, loader: 'file-loader?limit=100000', exclude: /node_modules/ },
      { test: /\.(css|scss)$/,
        use: ['cache-loader', 'style-loader', 'css-loader', 'sass-loader'], exclude: /node_modules/
      },
      { test: /\.js$/, use: [{loader: 'babel-loader'}], exclude: /node_modules/ },
      { test: /\.jsx$/, use: [{loader: 'babel-loader'}], exclude: /node_modules/ }
    ]
  },
  plugins: [HtmlWebpackPluginConfig]
}