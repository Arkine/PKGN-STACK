import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import Login from '../pages/Login';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';

export default () => 
		<Switch>
			<Route exact path="/" component={Home} />
			<Route exact path="/login" component={Login} />
			<Route component={NotFound} />
		</Switch>
