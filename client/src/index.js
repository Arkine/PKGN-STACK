import React from 'react'; 
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { setContext } from 'apollo-link-context';

import App from './components/App';
import authHeader from './helpers/auth-header';

import Routes from './router/routes';
import createHistory from 'history/createBrowserHistory';

// History API used for routing
const history = createHistory();

// const setAuthHeaders = setContext((request, previousContext) => {
// 	headers: authHeader()
// });

// Create the client link (should point to Graphql server)
// Connect JWT to every request
const client = new ApolloClient({
	uri: 'http://localhost:8080/graphql',
	request: async (operation) => {
		let token = await localStorage.getItem('app-authToken');

		operation.setContext({
			headers: {
				'Authorization': 'Bearer ' + token
			}
		})
	}
});
 
const renderApp = () => ReactDOM.render((
		<ApolloProvider client={client}>
			<Router history={history}>
				<App>
					<Routes />
				</App>
			</Router>
		</ApolloProvider>
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