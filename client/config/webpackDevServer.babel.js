import merge from 'webpack-merge';
import paths from './paths';
import common from './webpack.common.babel';
import dev from './webpack.dev.babel';

export default merge(dev, {
	devServer: {
		publicPath: '/',
		proxy: {
			"*": "http://localhost:8080"
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