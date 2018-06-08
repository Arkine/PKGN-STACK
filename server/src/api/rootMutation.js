import {
	GraphQLObjectType
} from 'graphql';

import auth from './mutations/auth';

export default new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		auth
	}
})