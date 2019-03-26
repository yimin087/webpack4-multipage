const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const pageConfig = require('./page.config.js')

const makePlugins = pageConfig => {
	const plugins = []

	pageConfig.pages.forEach(item => {
		plugins.push(
			new HtmlWebpackPlugin({
				template: `./src/pages/${item.pageName}/index.html`,
				filename: `${item.pageName}.html`,
				chunks: ['runtime', 'vendors', 'default', item.pageName].concat(
					item.chunks
				)
			})
		)
	})
	return plugins
}

const mergeCacheGroups = pageConfig => {
	const cacheGroups = {
		vendors: {
			test: /[\\/]node_modules[\\/]/,
			priority: -10,
			name: 'vendors'
		},
		default: {
			priority: -20,
			name: 'default'
		}
	}
	return Object.assign(cacheGroups, pageConfig.cacheGroups)
}

const makeEntry = pageConfig => {
	const entry = {}
	pageConfig.pages.forEach(item => {
		entry[item.pageName] = item.entry
	})
	return entry
}

const configs = {
	resolve: {
		extensions: ['.js', '.jsx'],
		alias: {
			'@': path.resolve(__dirname, '../src/pages'),
			common: path.resolve(__dirname, '../src/common')
		}
	},
	module: {
		rules: [
			{
				test: /\.png|.jpg|.jpeg|.gif/,
				use: {
					loader: 'url-loader',
					options: {
						name: '[path][name]_[hash:7].[ext]',
						outputPath: 'images/',
						limit: 10240
					}
				}
			},
			{
				test: /\.(ttf|eot|svg|woff|woff2)$/,
				use: {
					loader: 'url-loader',
					options: {
						name: '[name]_[hash:7].[ext]',
						outputPath: 'fonts/',
						limit: 10240
					}
				}
			},
			{
				test: /\.js$/,
				include: path.resolve(__dirname, '../src'),
				use: [
					{
						loader: 'babel-loader'
					}
				]
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: 'html-loader',
						options: {
							minimize: true
						}
					}
				]
			}
		]
	},
	optimization: {
		runtimeChunk: {
			name: 'runtime'
		},
		usedExports: true,
		splitChunks: {
			chunks: 'all'
		}
	},
	output: {
		filename: 'js/[name]_[hash:7].js',
		path: path.resolve(__dirname, '../dist')
	}
}

configs.entry = makeEntry(pageConfig)
configs.plugins = makePlugins(pageConfig)
configs.optimization.splitChunks.cacheGroups = mergeCacheGroups(pageConfig)

module.exports = configs
