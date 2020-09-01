/* eslint-disable no-unused-vars */
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const dotenv = require('dotenv');
const envFile = dotenv.config().parsed;
const envKeys = Object.keys(envFile).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(envFile[next]);
  return prev;
}, {});

module.exports = (env) => {
  return {
    entry: [
      // entry point of our app
      './client/index.js',
    ],
    output: {
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/',
      filename: 'bundle.js',
    },
    mode: env.NODE_ENV,
    devServer: {
      host: 'localhost',
      port: 8080,
      // match the output path
      contentBase: path.resolve(__dirname, 'dist'),
      // enable HMR on the devServer
      hot: true,
      // match the output 'publicPath'
      publicPath: '/',
      // fallback to root for other urls
      historyApiFallback: true,

      inline: true,

      headers: { 'Access-Control-Allow-Origin': '*' },
      /**
       * proxy is required in order to make api calls to
       * express server while using hot-reload webpack server
       * routes api fetch requests from localhost:8080/* (webpack dev server)
       * to localhost:3333/* (where our Express server is running)
       */
      proxy: {
        '/': {
          target: 'http://localhost:3333/',
          secure: false,
        },
      },
    },
    module: {
      rules: [
        {
          test: /\.jsx?/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        },
        {
          test: /\.s?css/,
          exclude: /node_modules/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './client/index.html',
      }),
      new webpack.DefinePlugin(envKeys),
    ],
    resolve: {
      // Enable importing JS / JSX files without specifying their extension
      extensions: ['.js', '.jsx'],
    },
  };
};
