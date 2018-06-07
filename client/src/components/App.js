import React from 'react';
// import { h, Component } from 'preact';
import Header from './Header';
import Footer from './Footer';

export default class App extends React.Component {
	render() {
		return (
			<div>
				<Header />
					<h1>app</h1>
				<Footer />
			</div>
		)
	}
}