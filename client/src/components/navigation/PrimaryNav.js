import React from 'react';
import { Link  } from 'react-router-dom';
import Auth from '../../helpers/auth';

import '../../styles/components/navigation/primaryNavigation.scss';

export default class PrimaryNavigation extends React.Component {
	handleLogout = (e) => {
		e.preventDefault();
		// Log the user out
		console.log('logging out...');

		Auth.deauthenticateUser();
	}

	render() {
		const isAuthenticated = Auth.isUserAuthenticated();
		return (
			<nav className="PrimaryNavigation">
				<div className="PrimaryNavigation__links">
					<Link to="/">Home</Link>

					{!isAuthenticated &&
						<React.ReactFragment>
							<Link to="/login">Login</Link>
							<Link to="/register">Register</Link>
						</React.ReactFragment>
					}

					{isAuthenticated &&
						<React.ReactFragment>
							<Link to='/users'>Users</Link>
							<Link to='/logout'>Logout</Link>
						</React.ReactFragment>
					}

				</div>
			</nav>
		);
	}
}