import React from 'react';
import { Link  } from 'react-router-dom'

import '../../styles/components/navigation/primaryNavigation.scss';

export default class PrimaryNavigation extends React.Component {
	render() {
		return (
			<nav className="PrimaryNavigation">
				<div className="PrimaryNavigation__links">
					<Link to="/">Home</Link>
					<Link to="/login">Login</Link>
					<Link to="/register">Register</Link>
				</div>
			</nav>
		);
	}
}