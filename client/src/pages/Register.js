import React from 'react';

import Auth from '../helpers/auth';

import RegisterForm from '../components/forms/RegisterForm';

export default class Register extends React.Component {
	componentWillMount() {
		// if (Auth.isUserAuthenticated()) {
		// 	this.props.history.push('/');
		// }
	}

	render() {
		return (
			<div>
				<h1>Register</h1>
				<RegisterForm {...this.props} />
			</div>
		);
	}
}