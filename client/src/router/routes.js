import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import AuthenticatedRoute from './AuthenticatedRoute';
import UnauthenticatedRoute from './UnauthenticatedRoute';
import AppliedRoute from './AppliedRoute';

import Login from '../pages/Login';
import Logout from '../pages/Logout';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import Register from '../pages/Register';
import Users from '../pages/Users';

export default ({ childProps }) =>
		<Switch>
			<AppliedRoute exact path="/" component={Home} props={childProps} />
			<AppliedRoute exact path="/logout" component={Logout} props={childProps} />

			<UnauthenticatedRoute exact path="/login" component={Login} props={childProps} />
			<UnauthenticatedRoute exact path="/register" component={Register} props={childProps} />

			<AuthenticatedRoute exact path="/users" component={Users} props={childProps} />>

			<AppliedRoute component={NotFound} props={childProps} />
		</Switch>
