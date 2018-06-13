import React from 'react';
import Auth from '../helpers/auth';

export default class Logout extends React.Component {
	componentDidMount() {
		// Logout the user
		Auth.deauthenticateUser();

		// Redirect to home page
		this.props.history.push('/');
	}

	render() {
		return (
			<div>
				Logging out...
			</div>
		)
	}
}