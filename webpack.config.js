var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry:  "./examples/app.js",
  output: {
    path: "./dist",
    publicPath: "/",
    filename: "bundle.js"
  },

  module: {
    loaders: [
      { test: /\.json$/, loader: "json" },
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
      //{ test: /\.css$/, loader: 'style!css?modules!postcss' },
      { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
      { test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=2048&name=assets/[name].[ext]'}
      //{ test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/, loader: ExtractTextPlugin.extract('',  "file-loader")}
    ]
  },
  postcss: [
    require('autoprefixer')
  ],

  plugins: [
    new ExtractTextPlugin("custom.css"),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: __dirname + "/examples/index.html"
    })
  ],

  devServer: {
    contentBase: "./dist",
    port:4036,
    colors: true,
    historyApiFallback: true,
    inline: true,
    hot:true
  }
}