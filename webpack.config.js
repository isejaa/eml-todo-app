const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const path = require("path");



const config = {
  devtool: 'eval-source-map',
  entry: "./src/app/index.js",
  output: {
    filename: "app.js"
  },
  resolve: {
    extensions: [".js", ".elm"],
    modules: ["node_modules"]
  },
  module: {
    rules: [
      {
        test: /\.elm$/,
        exclude: [/elm-stuff/, /node_modules/],
        use: [
          {
            loader: "elm-webpack-loader",
            options: {
              verbose: true,
              warn: true,
              debug: true
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
        test: /\.jpe?g$|\.ico$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$/,
        loader: 'file-loader?name=[name].[ext]'
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("app.css"),
    new HtmlWebpackPlugin({
      template: "src/app/index.html",
      inject: "body",
      filename: "index.html"
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ]
};

module.exports = config;
