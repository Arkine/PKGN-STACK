import {
	GraphQLString
} from 'graphql';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

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
	resolve: async (root, {username, email, password, confirmPassword}, { login, ctx }, info) => {
		if (password !== confirmPassword) {
			return {
				error: "Passwords do not match"
			}
		}

		console.log('registering...');

		const user = new User({
			email,
			username
		});

		try {
	
			await User.register(user, password);
			const token = jwt.sign(user.toJSON(), process.env.SECRET);

			return {
				token,
				user
			}
		} catch(error) {
			console.log('There was an error:', error);
			return {
				error
			}
		}
	}
}