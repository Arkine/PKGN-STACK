import merge from 'webpack-merge';
import paths from './paths';
import common from './webpack.common.babel';
import dev from './webpack.dev.babel';

export default merge(dev, {
	devServer: {
		proxy: {
			"*": "http://localhost:8080"
		},
		// contentBase: paths.appOutput,
		// contentBase: "http://localhost:8080",
		port: 3000,
		historyApiFallback: true,
		// watchContentBase: true,
		hot: true,
		overlay: true,
		inline: true,
		// progress: true,
		// compress: true,
		// color: true,
		// noInfo: true
	}
});