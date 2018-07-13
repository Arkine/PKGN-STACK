import paths from './paths';
import path from 'path';

export default {
	target: 'web',

	resolve: {
		extensions: ['.js', '.jsx'],
		alias: {
			app: paths.appSrc,
			'react': 'preact-compat',
			'react-dom': 'preact-compat'
		},
	},

	module: {
		rules: [
			// Loader for our scss files
			{
				test: /\.scss$/,
				use: [
					"style-loader",
					"css-loader",
					"sass-loader"
				]
			},
			// Loader for css files
			{
				test: /\.css$/,
				use: [
					"style-loader",
					"css-loader"
				]
			},
			// Our babel loader for our es6 files
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				include: [
					paths.appSrc,
					// Allows us to use react tools and syntax with preact
					path.resolve('node_modules/preact-compat/src'),
				],
				use: [{
					loader: 'babel-loader'
				}]
			}
		]
	}
}