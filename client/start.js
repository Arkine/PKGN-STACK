import Webpack from 'webpack';
import Koa from 'koa';
import koaWebpack from 'koa-webpack';
import WebpackDevServer from 'webpack-dev-server';

import webpackDevConfig from './config/webpack.dev.babel';

const isDev = true;
// const app = new Koa();

const compiler = Webpack(webpackDevConfig);

// app.use(WebpackDevServer(compiler));
const app = new WebpackDevServer(compiler);
app.listen(3000, () => {
	console.clear();
	console.log('Client listening on port 3000');
});
	