import React from 'react';

import RegisterForm from '../components/forms/RegisterForm';

export default class Register extends React.Component {
	render() {
		return (
			<div>
				<h1>Register</h1>
				<RegisterForm />
			</div>
		);
	}
}