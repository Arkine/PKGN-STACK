import merge from 'webpack-merge';
import dev from './webpack.dev.babel';
import paths from './paths';

export default merge(dev, {
	devServer: {
		contentBase: paths.appOutput,
		publicPath: '/',
		proxy: {
			"*": "http://localhost:5000"
		},
		port: 3000,
		historyApiFallback: true,
		hot: true,
		overlay: true,
		inline: true,
		compress: true,
		noInfo: true
	}
});