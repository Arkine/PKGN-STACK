import React from 'react';
import { graphql } from 'react-apollo';

import LOGIN_QUERY from '../../queries/auth';

class LoginForm extends React.Component {
	state = {
		email: '',
		password: '',
		error: ''
	}

	submitForm = async (e) => {
		e.preventDefault();

		try {
			const user = await this.props.LoginQuery({
				variables: {
					email: this.state.email,
					password: this.state.password
				}
			});

			console.log('got user!!!', user);
		} catch(error) {
			console.log('error: ', error);
			this.setState({error: error.message});
		}
	}

	render() {
		return (
			<form onSubmit={this.submitForm.bind(this)}>
				<input
					type="email"
					value={this.state.email}
					onChange={e => this.setState({email: e.target.value})}
					name="email"
					placeholder="Email"
				/>
				<input
					type="password"
					value={this.state.password}
					onChange={e => this.setState({password: e.target.value})}
					name="password"
					placeholder="Password"
				/>
				<button className="button submit">Login</button>
			</form>
		);
	}
}

export default graphql(LOGIN_QUERY, {
	name: 'LoginQuery'
})(LoginForm);