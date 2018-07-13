// import path from 'path';
import paths from './paths';
import merge from 'webpack-merge'
import common from './webpack.common.babel';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import HtmlWebpackHarddiskPlugin from 'html-webpack-harddisk-plugin';
// Set the node environment variables
process.env.BABEL_ENV = 'development';

export default merge(common, {
	mode: 'development',
	entry: [
		require.resolve('webpack/hot/dev-server'),
		'webpack-dev-server/client?http://localhost:3000/',
		paths.appIndexJs
	],
	devtool: 'cheap-module-source-map',
	plugins: [
		// Creates the index.html file
		new HtmlWebpackPlugin({
			template: paths.appHtml,
		}),
		// Emits a index.html on rebuild
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.NamedModulesPlugin(),
		// Enable Hot module reloading
		new webpack.HotModuleReplacementPlugin(),

	]
});