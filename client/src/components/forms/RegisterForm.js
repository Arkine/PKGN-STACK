import React from 'react';
import { graphql } from 'react-apollo';
import { Redirect } from 'react-router';

import REGISTER_QUERY from '../../queries/register';

class RegisterForm extends React.Component {
	state = {
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
		error: ''
	}

	submitForm = async (e) => {
		e.preventDefault();
		try {
			const response = await this.props.registerUserMutation({
				variables: {
					username: this.state.username,
					email: this.state.email,
					password: this.state.password,
					confirmPassword: this.state.confirmPassword
				}
			});

			const { user, error } = response.data.register;
			
			if (error) {
				this.setState({
					error: error.message
				});
				return false;
			}

			if (user) {				
				// redirect to login
				this.props.history.push('/login');
			}

		} catch(error) {
			this.setState({error: error.graphQLErrors[0].message});
		}

	
	}

	render() {
		// console.log(typeof this.state.error);
		return (
			<div>
				{this.state.error && 
					<span className="error">{this.state.error}</span>
				}
				<form onSubmit={this.submitForm.bind(this)}>
					<input
						type="text"
						value={this.state.username}
						onChange={e => this.setState({username: e.target.value})}
						name="username"
						placeholder="Username"
					/>
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
					<input
						type="password"
						value={this.state.confirmPassword}
						onChange={e => this.setState({confirmPassword: e.target.value})}
						name="confirmPassword"
						placeholder="Confirm Password"
					/>
					<button className="button submit">Register</button>
				</form>
			</div>
		);
	}
}

export default graphql(REGISTER_QUERY, {
	name: 'registerUserMutation'
})(RegisterForm);