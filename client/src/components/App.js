import { h, render, Component } from 'preact';
import Header from './Header';
import Footer from './Footer';

export default class App extends Component {
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