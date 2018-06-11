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
			const resp = await this.props.LoginQuery({
				variables: {
					email: this.state.email,
					password: this.state.password
				}
			});

			const { user, authToken } = resp.data.auth;
			console.log(resp);
			if (user) {
				// store the returned token in local Storage
				window.localStorage.setItem('app-authToken', authToken);
				// window.location = '/';
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
				<form onSubmit={this.submitForm.bind(this)} enctype="multipart/form-data">
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