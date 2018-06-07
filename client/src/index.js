import { h, render } from 'preact';

import App from './components/App';
 

const renderApp = render(
	(
		<App />
	), 
	document.getElementById('root')
);

if (module.hot) {
	console.log('its hot');
	module.hot.accept('./', () =>{
		console.log('reloading app...')
		return renderApp();	
	});
} 

// renderApp();