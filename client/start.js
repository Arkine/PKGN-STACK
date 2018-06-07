import Webpack from 'webpack';
import Koa from 'koa';
import koaWebpack from 'koa-webpack';
import WebpackDevServer from 'webpack-dev-server';
import paths from '../client/config/paths';
import webpackDevConfig from './config/webpack.dev.babel';

const isDev = true;
const devServerOpts =  {
	// proxy: "http://localhost:8080",
	// contentBase: paths.appOutput,
	// port: 3000,
	historyApiFallback: true,
	// watchContentBase: true,
	hot: true,
	overlay: true,
	inline: true,
	stats: {
		colors: true
	}
	// progress: true,
	// compress: true,
	// color: true,
	// noInfo: true
}

const compiler = Webpack(webpackDevConfig);

// app.use(WebpackDevServer(compiler));
const server = new WebpackDevServer(compiler, devServerOpts);
server.listen(3000, 'http://localhost:8080', () => {
	console.clear();
	console.log('Client listening on port 3000');
});
	