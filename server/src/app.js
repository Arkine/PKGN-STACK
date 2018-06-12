import Koa from 'koa';
import paths from '../config/paths';
import serve from 'koa-static';
import cors from 'koa-cors';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import schema from './api/rootSchema';
import passport from 'koa-passport';
// import session from 'koa-session';
import session from 'koa-session-store';
import mongoStore from 'koa-session-mongo';
import { graphqlKoa, graphiqlKoa} from 'apollo-server-koa';

import authMiddleware from './services/auth';
// import jwt from 'koa-jwt';

// import authMiddleware from './services/auth';
// import bodyParser from 'body-parser';
// import koaViews from 'koa-views';
// import mongoose from 'mongoose';

const isDev = process.env.NODE_ENV === 'development' ? true : false;

console.log('isDev: ', isDev);

console.log('Starting server...');

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
		await ctx.redirect('/');
		// if (ctx.status === 404) {
		// } else {
		// 	await ctx.redirect('/');
		// }
	}
});

// Prevent Xorigin request errs
app.use(cors());

// Parse req.body into JSON. Might have to move this to Graphql middleware
app.use(bodyParser());

// app.use((ctx, next) => {
// 	console.log('request', ctx.request.body);
// 	next();
// })

// Set our session keys
// app.use(session({
// 	secret: process.env.SECRET,
// 	resave: false,
// 	saveUninitialized: false,
// 	store: mongoStore.create({
// 		url: process.env.DATABASE
// 	})
	
// }, app));

// Passport authentication
app.use(passport.initialize());
import './services/passport';

app.use(authMiddleware);

// app.use(passport.session());

// Create a new router for path handling
const router = new Router();

// Setup our Graphql server
router.get(
	'/graphql',
	graphqlKoa((ctx, next) => {
		
		let context = {
			login: ctx.login.bind(ctx),
			user: ctx.req.user
		}

		return {
			schema,
			context
		}
	})
);

router.post(
	'/graphql',
	graphqlKoa((ctx, next) => {
	
		let context = {
			login: ctx.login.bind(ctx),
			user: ctx.state.user,
			ctx
		}

		return {
			schema,
			context
		}
	})
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

// Responds to OPTIONS requests with an Allow header
app.use(router.allowedMethods());

// Serves our static html file
app.use(serve(paths.appOutput));

module.exports = app;
