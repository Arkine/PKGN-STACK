import React from 'react';
import { graphql } from 'react-apollo';

import LOGIN_QUERY from '../../queries/auth';

import Auth from '../../helpers/auth';

class LoginForm extends React.Component {
	state = {
		email: '',
		password: '',
		error: ''
	}

	submitForm = async (e) => {
		e.preventDefault();

		try {
			const resp = await this.props.LoginQuery({
				variables: {
					email: this.state.email,
					password: this.state.password
				}
			});

			const { user, authToken } = resp.data.auth;

			if (user) {
				// store the returned token in local Storage
				Auth.authenticateUser(authToken);
				
				// Redirect to home page
				this.props.history.push('/');
			}

			
		} catch(error) {
			console.log(error.graphQLErrors);
			this.setState({error: error.graphQLErrors[0].message});
		}
	}

	render() {
		return (
			<div>
				{this.state.error && 
					<span className="error">{this.state.error}</span>
				}
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
			</div>
		);
	}
}

export default graphql(LOGIN_QUERY, {
	name: 'LoginQuery'
})(LoginForm);