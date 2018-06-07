import React from 'react';

import PrimaryNavigation from '../components/navigation/PrimaryNav';

export default class Header extends React.Component {
	render() {
		return (
			<header>
				<PrimaryNavigation />
			</header>
		)
	}
}