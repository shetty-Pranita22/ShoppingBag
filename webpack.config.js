const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: "./src/js/index.js",
  output: {
    path: __dirname+"./dist",
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      },
      {
        test: /\.css$/,
        use:[ {
           loader: 'style-loader',
          },
          {
            loader: 'css-loader'
         }]
      },
      {
        test: /\.scss$/,
        exclude: /(node_modules)/,
        use:[ {
          loader: 'style-loader',
         },
         {
           loader: 'css-loader'
        },
        {
          loader: 'sass-loader',
         }
      ]
      },
      {
        test: /\.(png|jpg|gif|svg|jpeg)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        },
      }
    ]
  },
  devtool: "cheap-eval-source-map",
  plugins: [
  new HtmlWebpackPlugin({template: 'index.html'}),
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery'
  })
  ],
  mode: 'development'
}