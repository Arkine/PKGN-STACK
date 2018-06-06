// import path from 'path';
import paths from './paths';
import merge from 'webpack-merge'
import common from './webpack.common.babel';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

// Set the node environment variables
process.env.BABEL_ENV = 'development';

export default merge(common, {
	mode: 'development',
	entry: [
		require.resolve('webpack/hot/dev-server'),
		paths.appIndexJs
	],
	devtool: 'cheap-module-source-map',
	devServer: {
		proxy: "http://localhost:8080",
		contentBase: paths.appOutput,
		historyApiFallback: true,
		hot: true,
		inline: true,
		progress: true,
		color: true,
		noInfo: true
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			inject: true,
			template: paths.appHtml
		})
	]
});