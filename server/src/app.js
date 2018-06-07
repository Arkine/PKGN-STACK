import Koa from 'koa';
// import path from 'path';
import paths from '../config/paths';
import serve from 'koa-static';
import cors from 'koa-cors';
import Router from 'koa-router';
import koaBody from 'koa-bodyparser';
import { graphqlKoa, graphiqlKoa} from 'apollo-server-koa';
import schema from './api/rootSchema';
// import bodyParser from 'body-parser';
// import session from 'koa-session-store';
// import koaViews from 'koa-views';
// import mongoStore from 'koa-session-mongo';
// import mongoose from 'mongoose';

const isDev = process.env.NODE_ENV === 'development' ? true : false;

console.log('isDev: ', isDev);

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

// Our middleware for handling 404
app.use(async (ctx, next) => {
	try {
		await next();
		const status = ctx.status || 404;

		if (status === 404) {
			await ctx.redirect('/');
		}
	} catch (error) {
		ctx.status = error.status || 500;
		if (ctx.status === 404) {
			await ctx.redirect('/');
		} else {
			await ctx.redirect('/');
		}
	}
});

// Serves our static html file
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

// Create a new router for path handling
const router = new Router();

// Parse req.body into JSON. Might have to move this to Graphql middleware
app.use(koaBody());

// Setup our Graphql server
router.get(
	'/graphql',
	graphqlKoa((req, res) => {
		// Bind user here so that the info is available on all reqs
		return {
			schema
		}
	})
);

router.post(
	'/graphql',
	graphqlKoa({ schema })
);

// Our in browser IDE for Graphql
router.get(
	'/graphiql',
	graphiqlKoa({
		endpointURL: '/graphql'
	})
);
// Tell our app to use our routes
app.use(router.routes());

// Catch all routes that didn't get caught
// router.all("*", serve(paths.appOutput));

// Responds to OPTIONS requests with an Allow header
app.use(router.allowedMethods());

module.exports = app;
