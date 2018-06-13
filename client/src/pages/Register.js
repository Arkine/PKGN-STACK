import React from 'react';

import Auth from '../helpers/auth';

import RegisterForm from '../components/forms/RegisterForm';

export default class Register extends React.Component {
	render() {
		return (
			<div>
				<h1>Register</h1>
				<RegisterForm {...this.props} />
			</div>
		);
	}
}