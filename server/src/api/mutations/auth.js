import {
	GraphQLString
} from 'graphql';

import authType from '../types/authType';
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
			// Check if the user passes authentication
			const resp = await User.authenticate()(email, password);
			const { user, error } = resp;

			if (error) {
				return {
					error
				}
			}
			
			// Sign the token with the user ID
			const authToken = jwt.sign({
				sub: user._id,
				iat: Math.floor(Date.now() / 1000), // Issued at time,
				exp: Math.floor(Date.now() / 1000) * (60 * 60) // expire in 1 hr
			}, process.env.SECRET);

			// Log the user in
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
	}
}