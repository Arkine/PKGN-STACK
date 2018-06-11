import {
	GraphQLObjectType,
	GraphQLString
} from 'graphql';

import userType from '../types/userType';

export default new GraphQLObjectType({
	name: 'Auth',
	description: 'Authentication for a user',
	fields: {
		authToken: {
			type: GraphQLString
		},
		refreshToken: {
			type: GraphQLString
		},
		user: {
			type: userType
		},
		error: {
			type: GraphQLString
		}
	}
});