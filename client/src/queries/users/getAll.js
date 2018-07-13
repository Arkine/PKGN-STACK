import gql from 'graphql-tag';


export default gql`
	query {
		getUsers {
			username,
			email
		}
	}
`;