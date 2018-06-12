import {
	GraphQLObjectType,
	GraphQLString
} from 'graphql';

export default new GraphQLObjectType({
	name: 'User',
	description: 'A user',
	fields: {
		email: {
			type: GraphQLString,
		},
		username: {
			type: GraphQLString
		},
		id: {
			type: GraphQLString
		}
	}
});