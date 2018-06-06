import paths from './paths';
import merge from 'webpack-merge'
import webpack from 'webpack';
import common from './webpack.common.babel';

// Set the node environment variables
process.env.BABEL_ENV = 'production';

export default merge(common, {
	mode: 'production',
	entry: [
		paths.appIndexJs
	],
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin()
	]
});