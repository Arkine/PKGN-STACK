// import path from 'path';
import paths from './paths';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import nodeExternals from 'webpack-node-externals';
import WriteFilePlugin from 'write-file-webpack-plugin';

// Set the node environment variables
process.env.BABEL_ENV = 'development';

export default {
	mode: 'development',
	devtool: 'cheap-module-source-map',
	entry: [
		require.resolve('webpack/hot/dev-server'),
		paths.appIndexJs
	],
	target: 'node',
	externals: [nodeExternals()],
	stats: {
		colors: true,
		chunks: false
	},
	output: {
		path: paths.appOutput,
		filename: 'bundle.js'
	},
	resolve: {
		extensions: ['.js', '.jsx'],
		alias: {
			app: paths.appSrc
		},	
	},
	devServer: {
		contentBase: paths.appOutput,
		historyApiFallback: true,
		hot: true,
		inline: true,
		progress: true,
		color: true
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
				include: paths.appSrc,
				exclude: /node_modules/, 
				loader: 'babel-loader'
			}
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new HtmlWebpackPlugin({
			inject: true,
			template: paths.appHtml
		}),
		// new WriteFilePlugin()
	]
}