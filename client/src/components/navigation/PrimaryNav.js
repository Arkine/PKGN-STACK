import React from 'react';
import { Link  } from 'react-router-dom'

export default class PrimaryNavigation extends React.Component {
	render() {
		return (
			<nav>
				<Link to="/">Home</Link>
				<Link to="/login">Login</Link>
			</nav>
		);
	}
}