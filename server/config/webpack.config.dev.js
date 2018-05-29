// import path from 'path';
import paths from './paths';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import nodeExternals from 'webpack-node-externals';

// Set the node environment variables
process.env.BABEL_ENV = 'development';

export default {
	mode: 'development',
	devtool: 'cheap-module-source-map',
	entry: {
		index: [
			'babel-polyfill',
			paths.serverStart
		],
	},
	target: 'node',
	externals: [nodeExternals()],
	output: {
		publicPath:paths.appClient,
		path: paths.appOutput,
		filename: 'bundle.js'
	},
	resolve: {
		// extensions: ['', '.js', '.jsx'],
		alias: {
			app: paths.appSrc
		},	
	},
	devServer: {
		contentBase: paths.appOutput,
		historyApiFallback: true,
		port: 8000,
		hot: true,
		inline: true,
		progress: true
	},
	module: {
		rules: [
			{
				test: /\.html$/,
				exclude: /node_modules/,
				use: [{
					loader: 'file-loader'
				}]
			},
			{
				test: /\.(js|jsx)$/,
				include: paths.appSrc,
				use: [{
					loader: 'babel-loader',
				}],
				exclude: /node_modules/
			}
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new HtmlWebpackPlugin({
			inject: true,
			template: paths.appHtml
		})
	]
}