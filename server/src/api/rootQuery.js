import {
	GraphQLObjectType
} from 'graphql';

import getUser from './resolvers/users/getUser';

export default new GraphQLObjectType({
	name: 'Query',
	fields: {
		getUser
	}
})