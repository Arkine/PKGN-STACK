import {
	GraphQLSchema
} from 'graphql';

import user from './types/userType';
import auth from './types/authType';
import query from './rootQuery';
import mutation from './rootMutation';

export default new GraphQLSchema({
	query,
	mutation,
	types: [
		user,
		auth
	]
});