const path = require('path')
const webpackMerge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const commonConfig = require('./webpack.common.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const prodConfig = {
	mode: 'production',
	// devtool: 'cheap-module-source-map',
	performance: {
		hints: false,
		maxEntrypointSize: 512000,
		maxAssetSize: 512000
	},
	module: {
		rules: [
			{
				test: /\.css/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: '../'
						}
					},
					'css-loader',
					'postcss-loader'
				]
			},
			{
				test: /\.scss/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: '../'
						}
					},
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
			new OptimizeCSSAssetsPlugin({}),
			new TerserPlugin({
				test: /\.js(\?.*)?$/i,
				exclude: /\/node_modules/
			})
		]
	},
	plugins: [
		new CleanWebpackPlugin(['dist'], {
			root: path.resolve(__dirname, '../')
		}),
		new MiniCssExtractPlugin({
			filename: 'css/[name]_[hash:7].css',
			chunkFilename: 'css/[name]_[hash:7].chunk.css'
		})
	]
}

module.exports = webpackMerge(commonConfig, prodConfig)
