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
		// require.resolve('webpack/hot/dev-server'),
		// 'webpack-dev-server/client?http://localhost:3000/',
		// require.resolve('webpack-hot-client/client'),
		paths.appIndexJs
	],
	// watch: true,
	// stats: "errors-only",
	devtool: 'cheap-module-source-map',
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: paths.appHtml,
			alwaysWriteToDisk: false
		}),
		new HtmlWebpackHarddiskPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		
	]
});