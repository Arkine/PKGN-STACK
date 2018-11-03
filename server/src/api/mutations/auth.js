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

			const authPayload = {
				sub: {
					user: {
						_id: user._id,
						email: user.email,
					}
				},
				iat: Math.floor(Date.now() / 1000), // Issued at time,
			};

			// Sign the token with the user ID
			const authToken = jwt.sign(authPayload, process.env.SECRET, {
				expiresIn: '5s',
			});

			const newToken = await User.generateToken();

			user.refreshToken = newToken;

			await user.save();

			const refreshPayload = {
				tid: newToken,
				iat: Math.floor(Date.now() / 1000), // Issued at time,
			}

			const refreshToken = jwt.sign(refreshPayload, process.env.SECRET, {
				expiresIn: '2h',
			});

			return {
				authToken,
				refreshToken,
				user
			}

		} catch (error) {
			console.log('error at auth mutation:', error);

			return {
				error
			}
		}
	}
}