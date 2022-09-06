const path = require('path');
const webpackNodeExternals = require('webpack-node-externals');

const config = {
  target: 'node',
  mode: 'development',
  // Root file
  entry: './server/index.js',
  externals: [webpackNodeExternals()],
  // Output
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        loader: "babel-loader",
        exclude: [/node_modules/],
        options: {
          presets: [
            '@babel/preset-react',
            ['@babel/env', { targets: { browsers: ['last 2 versions'] } }]
          ]
        }
      },

      {
        test: /\.(jpeg|jpg|png|svg|otf|tiff|wav|mp3)$/,
        loader: 'url-loader'
      },
      
      {
        test: /\.svg$/,
        loader: 'svg-url-loader',
        options: {
          encoding: 'base64',
          limit: 10000,
        },
      },

    ],
  },
}

module.exports = config;