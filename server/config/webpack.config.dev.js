import path from 'path';
import paths from './paths';
import webpack from 'webpack';

// Set the node environment variables
process.env.BABEL_ENV = 'development';

export default {
	mode: 'development',
	devtool: 'source-map',
	entry: {
		Server: paths.serverStart
	},
	output: {
		publicPath: '/',
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].bundle.js'
	},
	resolve: {
		alias: {
			app: paths.appSrc
		},	
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				include: paths.appSrc,
				use: [
					'babel-loader',
				],
				options: {
					cacheDirectory: true,
				},
				exclude: /node_modules/
			}
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin()
	]
}