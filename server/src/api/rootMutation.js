import {
	GraphQLObjectType
} from 'graphql';

import auth from './mutations/auth';
import register from './mutations/register';

export default new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		auth,
		register
	}
});