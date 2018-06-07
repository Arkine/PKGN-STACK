import React from 'react'; 
import ReactDOM from 'react-dom';
import Router from 'preact-router';
import App from './components/App';
 
const renderApp = ReactDOM.render((
		<App />
	), 
	document.getElementById('root')
);

if (module.hot) {
	module.hot.accept('./', () =>{
		console.log('reloading app...')
		return renderApp();	
	});
} 

renderApp();