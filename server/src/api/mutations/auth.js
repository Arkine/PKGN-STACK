import {
	GraphQLString
} from 'graphql';

import authType from '../types/authType';
import passport from 'koa-passport';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

const User = mongoose.model('User');

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
	resolve: async (root, {email, password}, { login, ctx }, info) => {
		console.log('authenticating...');
		try {
			const resp = await User.authenticate()(email, password);
			const { user, error } = resp;

			if (error) {
				return {
					error
				}
			}
			
			const authToken = jwt.sign(user.toJSON(), process.env.SECRET);
			login(user);
			
			return {
				authToken,
				user,
				error
			}
			
		} catch (error) {
			console.log('error at auth mutation:', error);

			return {
				error
			}
		}
		
		// return User.authenticate()(email, password, async (err, user, info) => {
		// 	console.log('ctx', info);
		
		// 	if (err || !user) {
		// 		return {
		// 			error: 'Something is not right',
		// 			user: user
		// 		};
		// 	}

		// 	console.log('authenticating login...', user)

		// 	try {
		// 		console.log(user);
		// 		const newUser = await login(user.toJSON());
		// 		const authToken = jwt.sign(user, process.env.SECRET);
		// 		return {
		// 			authToken,
		// 			refreshToken: '124',
		// 			user: newUser
		// 		}
		// 	} catch (error) {
		// 		console.log('there was an error', error);

		// 		return {
		// 			error
		// 		}
		// 	}

		// 	// login(user, err => {
		// 	// 	console.log('Loggin in');
		// 	// 	if (err) {
		// 	// 		return {
		// 	// 			error: 'Something is not right',
		// 	// 			user   : user
		// 	// 		};
		// 	// 	}
		// 	// 	// generate a signed son web token with the contents of user object and return it in the response
		// 	// 	const token = jwt.sign(user, process.env.SECRET);
		// 	// 	return {
		// 	// 		authToken: token,
		// 	// 		refreshToken: '1234',
		// 	// 		user
		// 	// 	};
		// 	// });

		// // 	return data;
		// });
	}
}