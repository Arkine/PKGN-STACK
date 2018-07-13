import {
	GraphQLObjectType
} from 'graphql';

import getUser from './resolvers/users/getUser';
import getUsers from './resolvers/users/getUsers';

export default new GraphQLObjectType({
	name: 'Query',
	fields: {
		getUser,
		getUsers
	}
})