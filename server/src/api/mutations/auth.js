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

		try {
			const resp = await User.authenticate()(email, password);
			const { user, error } = resp;

			if (error) {
				return {
					error
				}
			}
			
			const authToken = jwt.sign({
				sub: user._id
			}, process.env.SECRET);

			
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