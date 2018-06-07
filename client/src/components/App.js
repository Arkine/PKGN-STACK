import React from 'react';
import Header from './Header';
import Footer from './Footer';

import '../styles/lib/normalize.css';
import '../styles/lib/reset.css';
import '../styles/app.scss';

export default class App extends React.Component {
	render() {
		return (
			<div>
				<Header />
					<main>
						{this.props.children}
					</main>
				<Footer />
			</div>
		)
	}
}