import paths from './paths';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import nodeExternals from 'webpack-node-externals';
import WriteFilePlugin from 'write-file-webpack-plugin';

// Set the node environment variables
process.env.BABEL_ENV = 'development';

export default {
	target: 'web',
	output: {
		publicPath: paths.appOutput,
		path: paths.appOutput,
		filename: 'bundle.js'
	},
	resolve: {
		extensions: ['.js', '.jsx'],
		alias: {
			app: paths.appSrc
		},	
	},

	module: {
		rules: [
			// {
			// 	test: /\.html$/,
			// 	exclude: /node_modules/,
			// 	use: [{
			// 		loader: 'file-loader'
			// 	}]
			// },
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/, 
				use: [{
					loader: 'babel-loader'
				}]
			}
		]
	}
}