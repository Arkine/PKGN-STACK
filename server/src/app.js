import Koa from 'koa';
// import path from 'path';
import paths from '../config/paths';
import serve from 'koa-static';
import cors from 'koa-cors';
import Router from 'koa-router';
// import bodyParser from 'body-parser';
// import Webpack from 'webpack';
// import session from 'koa-session-store';
// import koaViews from 'koa-views';
// import mongoStore from 'koa-session-mongo';
// import mongoose from 'mongoose';

const isDev = process.env.NODE_ENV === 'development' ? true : false;

console.log('isDev: ', isDev)

// const MongoStore = connectMongo(session);

console.log('Starting app...');

const app = new Koa();

// Prevent Xorigin request errs
app.use(cors());

// HTTP request logger
app.use(async (ctx, next) => {
	const start = new Date();
	await next();
	const ms = new Date() - start;
	console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});

app.use(serve(paths.appOutput));

// app.use(session({
// 	store: mongoStore.create({
// 		host: 'mongodb',
// 		db: 'overwatch',
// 		mongoose: mongoose.connection
// 	})
// }))

// Prevent Xorigin request errs
app.use(cors());

const router = new Router();

router.use('*', serve(paths.appOutput));

// Parses body data into JSON format
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

module.exports = app;
