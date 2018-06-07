import {
	GraphQLSchema
} from 'graphql';

import user from './types/userType';
import query from './rootQuery';

export default new GraphQLSchema({
	query,
	types: [
		user
	]
})