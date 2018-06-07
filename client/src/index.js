import React from 'react'; 
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import App from './components/App';

import Routes from './router/routes';
import createHistory from 'history/createBrowserHistory';

// History API used for routing
const history = createHistory();

// Create the client link (should point to Graphql server)
const client = new ApolloClient({
	uri: 'http://localhost:8080/graphql'
})
 
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