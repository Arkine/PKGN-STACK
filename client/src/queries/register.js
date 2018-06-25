import gql from 'graphql-tag';

export default gql`
	mutation($username: String!, $email: String!, $password: String!, $confirmPassword: String!) {
		register(username: $username, email: $email, password: $password, confirmPassword: $confirmPassword) {
			token,
			error,
			user {
				id,
				email
			}
		}
	}
`;