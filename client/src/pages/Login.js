import React from 'react';

import LoginForm from '../components/forms/LoginForm';

export default class LoginPage extends React.Component {
	render() {
		return (
			<div>
				<h1>Login</h1>
				<LoginForm {...this.props} />
			</div>
		);
	}
}