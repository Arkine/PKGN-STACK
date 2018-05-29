import Koa from 'koa';
// import path from 'path';
import cors from 'koa-cors';
import logger from 'morgan';
import bodyParser from 'body-parser';
import Webpack from 'webpack';
import session from 'koa-session-store';
import paths from '../config/paths';
import koaViews from 'koa-views';
import mongoStore from 'koa-session-mongo';
import mongoose from 'mongoose';

import middleware from 'koa-webpack';

import webpackDevConfig from '../config/webpack.config.dev';

const isDev = process.env.NODE_ENV === 'development' ? true : false;

// const MongoStore = connectMongo(session);

console.log('Starting app...');

const app = new Koa();

// Start our Webpack dev server
// let webpackConfig;
// if (isDev) {
// 	webpackConfig = Object.create(webpackDevConfig);
// }

const compiler = Webpack(webpackDevConfig);

app.use(middleware({
	compiler,
	entry: [
		'babel-polyfill',
		paths.serverStart
	],
	dev: {
		publicPath: paths.appOutput
	}
}));

// app.use(session({
// 	store: mongoStore.create({
// 		host: 'mongodb',
// 		db: 'overwatch',
// 		mongoose: mongoose.connection
// 	})
// }))

// Set the app's port
// app.set('port', process.env.PORT || 7777);

// Prevent Xorigin request errs
app.use(cors());

// HTTP request logger
app.use(logger('dev'));

// Parses body data into JSON format
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



module.exports = app;
