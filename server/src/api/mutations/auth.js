import {
	GraphQLString
} from 'graphql';

import authType from '../types/authType';
import passport from 'passport';

export default {
	type: authType,
	description: 'Login a user',
	args: {
		email: {
			type: GraphQLString
		},
		password: {
			type: GraphQLString
		}
	},
	resolve: (root, {email, password}, { login, ctx }, info) => {
		console.log({
			authToken: '123'
		})
		// console.log(passport.authenticate('local', {session: false}));
		// return passport.authenticate('local', {session: false}, (err, user, info) => {
		// 	console.log('ctx', ctx.req);
		
		// 	if (err || !user) {
		// 		return {
		// 			error: 'Something is not right',
		// 			user   : user
		// 		};
		// 	}
		// 	console.log('authenticating login...', user)
		// 	login(user, {session: false}, (err) => {
		// 		console.log('Loggin in');
		// 		if (err) {
		// 			return {
		// 				error: 'Something is not right',
		// 				user   : user
		// 			};
		// 		}
		// 		// generate a signed son web token with the contents of user object and return it in the response
		// 		const token = jwt.sign(user, process.env.SECRET);
		// 		return {
		// 			authToken: token,
		// 			refreshToken: '1234',
		// 			user
		// 		};
		// 	});

		// 	return data;
		// });
	}
}