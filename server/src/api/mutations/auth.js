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
	resolve: async (root, {email, password}, { login, ctx, next }, info) => {
		console.log('authenticating...');
		
		if (!email || !password) {
			return {
				error: {
					message: 'Please enter an email or password'
				}
			}
		}

		try {
			// Check if the user passes authentication
			await passport.authenticate('local-login', (error, user, token) => {
				if (error) {
					return {
						error
					}
				}

				return {
					token,
					user
				}
			

			})(ctx, next);
		

		} catch (error) {
			console.log('error at auth mutation:', error);

			return {
				error
			}
		}
	}
}