import Webpack from 'webpack';
// import Koa from 'koa';

// import middleware from 'koa-webpack';

import webpackDevConfig from './config/webpack.config.dev';

const isDev = true;

// Start our Webpack dev server
let webpackConfig;
if (isDev) {
	webpackConfig = Object.create(webpackDevConfig);
}

const compiler = Webpack(webpackDevConfig);

app.use(middleware({
	compiler,
}));