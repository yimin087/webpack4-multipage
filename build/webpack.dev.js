const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

const devConfig = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    port: 9000,
    open: true,
    hot: true,
    // hotOnly: true,
    historyApiFallback: true,
    // 配置代理
    proxy: {
			'/api': {
        target: 'https://www.baidu.com',
        pathRewrite: {"^/api" : ""},
        changeOrigin: true,
				// secure: false,
				// pathRewrite: {
				// 	'header.json': 'demo.json'
				// },
				// headers: {
        //   host: 'https://www.baidu.com',
        //   cookie: 'asdasdasdasd'
				// }
			}
		}
  },
  module: {
    rules: [
      {
        test: /\.css/,
        use: [
          'style-loader', 
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.scss/,
        use: [
          'style-loader', 
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
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}

module.exports = webpackMerge(commonConfig, devConfig)