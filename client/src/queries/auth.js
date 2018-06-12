import gql from 'graphql-tag';

export default gql`
	mutation($email: String!, $password: String!) {
		auth(email: $email, password: $password) {
			authToken,
			refreshToken,
			error,
			user {
				id,
				email
			}
		}
	}
`;