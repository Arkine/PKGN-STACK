import React from 'react';

import {graphql} from 'react-apollo';

import USERS_QUERY from '../queries/users/getAll';

class Users extends React.Component {
	render() {
		const {users} = this.props;
		console.log(this.props)
		let usersList = [];

		if (users) {
			usersList = users.map((user) => {
				return(
					<li key={user.id}>
						{user.username}
						{user.email}
					</li>
				)
			});
		}

		return(
			<ol>
				{usersList}
			</ol>
		)
	}
}

export default graphql(USERS_QUERY, {
	props: ({ data }) => ({
		loading: data.loading,
		users: data.getUsers,
		errors: data.error
	})
})(Users);