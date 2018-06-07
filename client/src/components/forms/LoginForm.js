import React from 'react';

export default class LoginPage extends React.Component {
	state = {
		email: '',
		password: ''
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