import {
	GraphQLString
} from 'graphql';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import passport from 'koa-passport';

import authType from '../types/authType';

const User = mongoose.model('User');

export default {
	type: authType,
	description: 'Register a user',
	args: {
		username: {
			type: GraphQLString
		},
		email: {
			type: GraphQLString
		},
		password: {
			type: GraphQLString
		},
		confirmPassword: {
			type: GraphQLString
		}
	},
	resolve: async (root, {username, email, password, confirmPassword}, { ctx, next }, info) => {
		if (password !== confirmPassword) {
			return {
				error: "Passwords do not match"
			}
		}

		console.log('next', info);

		console.log('registering...');

		try {
			
			// Try to register new user
			const user = new User({
				email,
				username,
				password
			});
	
			await passport.authenticate('local-register', {session: false}, (error, user) => {
				if (error) {
					return {
						error
					}
				}
				
				if (!user) {
					return {
						error: {
							message: 'Error registering user'
						}
					}
				}

				return {
					user
				}
			})(ctx, next);
			

		} catch(error) {
			console.log('There was an error:', error);
			return {
				error
			}
		}
	}
}