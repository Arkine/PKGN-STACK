import paths from './paths';

export default {
	target: 'web',
	output: {
		publicPath: paths.appOutput,
		path: paths.appOutput,
		filename: 'bundle.js'
	},
	// externals: [nodeExternals()],
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