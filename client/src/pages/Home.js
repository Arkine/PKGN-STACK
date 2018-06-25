import React from 'react';

import '../styles/pages/homePage.scss';

import Auth from '../helpers/auth';

export default class HomePage extends React.Component {
	render() {
		const isAuthenticated = Auth.isUserAuthenticated();

		return (
			<div>
				<h1>xssasadsd</h1>

				{isAuthenticated && 
					<div>
						<h2>Welcome!</h2>
					</div>
				}
			</div>
		);
	}
}