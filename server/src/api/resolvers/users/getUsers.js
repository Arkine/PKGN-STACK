import mongoose from 'mongoose';
import {
	GraphQLList,
} from 'graphql';

import userType from '../../types/userType';

const User = mongoose.model('User');

export default {
	type: new GraphQLList(userType),
	description: 'returns a list of users',
	resolve: async (root, args, req) => {

		try {
			const users = await User.find({});

			return users;
		} catch(error) {
			throw new Error(error.message);
		}
	}
}