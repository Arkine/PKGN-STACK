import React from 'react';

export default class RegisterPage extends React.Component {
	state = {
		username: '',
		email: '',
		password: '',
		confirmPassword: ''
	}
	submitForm = async (e) => {
		e.preventDefault();

		// try {}
	}

	render() {
		return (
			<div>
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
					<button className="button submit">Login</button>
				</form>
			</div>
		);
	}
}