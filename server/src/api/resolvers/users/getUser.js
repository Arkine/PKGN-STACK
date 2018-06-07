import mongoose from 'mongoose';
import {
	GraphQLID
} from 'graphql';

import userType from '../../types/userType';

export default {
	type: userType,
	description: 'returns a single user',
	resolve: (root, args, req) => {
		
	}
}