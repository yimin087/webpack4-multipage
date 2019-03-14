const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const prodConfig = {
  mode: 'production',
  // devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.css/,
        use: [
          MiniCssExtractPlugin.loader, 
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.scss/,
        use: [
          MiniCssExtractPlugin.loader, 
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            }
          }, 
          'sass-loader', 
          'postcss-loader'
        ]
      }
    ]
  },
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]_[hash:7].css',
      chunkFilename: '[name]_[hash:7].chunk.css'
    })
  ],
  // output: {
    // publicPath: '/aaa',
  // }
}

module.exports = webpackMerge(commonConfig, prodConfig)