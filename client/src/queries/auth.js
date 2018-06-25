import gql from 'graphql-tag';

export default gql`
	mutation($email: String!, $password: String!) {
		auth(email: $email, password: $password) {
			token,
			error,
			user {
				id,
				email
			}
		}
	}
`;