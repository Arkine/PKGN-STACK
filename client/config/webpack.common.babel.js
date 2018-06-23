import paths from './paths';
import path from 'path';

export default {
	target: 'web',
	// output: {
	// 	publicPath: paths.appOutput,
	// 	path: paths.appOutput,
	// 	filename: 'bundle.js'
	// },
	// externals: [nodeExternals()],
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
			// {
			// 	test: /\.html$/,
			// 	exclude: /node_modules/,
			// 	use: [{
			// 		loader: 'file-loader'
			// 	}]
			// },
			{
				test: /\.scss$/,
				use: [
					"style-loader",
					"css-loader",
					"sass-loader"
				]
			},
			{
				test: /\.css$/,
				use: [
					"style-loader",
					"css-loader"
				]
			},
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/, 
				include: [
					paths.appSrc,
					path.resolve('node_modules/preact-compat/src'),
				],
				use: [{
					loader: 'babel-loader'
				}]
			}
		]
	}
}