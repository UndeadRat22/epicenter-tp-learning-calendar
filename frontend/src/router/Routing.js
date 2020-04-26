import React, { useEffect } from 'react';
import {
  BrowserRouter as Router, Route, Switch, Redirect, useHistory,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Home from '../pages/Home';
import Topics from '../pages/Topics';
import MyTeam from '../pages/MyTeam';
import Profile from '../pages/Profile';
import ProtectedRoute from './ProtectedRoute';
import TopNavBar from '../components/TopNavBar';
import { LOGGED_IN, LOADING_FETCH_SELF } from '../constants/AuthStatus';
import { fetchSelf } from '../state/actions/auth';
import LoadingIndicator from '../components/LoadingIndicator';

const Routing = () => {
  const auth = useSelector(state => state.auth);
  const { status } = auth;
  const dispatch = useDispatch();

  const isAuthenticated = auth.status === LOGGED_IN;

  useEffect(() => {
    dispatch(fetchSelf());
  }, [dispatch]);

  const defaultPathComponent = () => {
    if (status === LOADING_FETCH_SELF)
      return <LoadingIndicator text="Loading session..." />;
    return <Redirect to={isAuthenticated ? '/home' : '/signin'} />;
  };

  return (
    <Router>
      <div>
        {isAuthenticated ? <TopNavBar /> : null}
        <Switch>
          <Route
            path="/"
            exact
            component={defaultPathComponent}
          />
          <Route path="/invitation/:invitationId" component={SignUp} />
          <Route path="/signin" component={SignIn} />
          <ProtectedRoute path="/home" component={Home} />
          <ProtectedRoute path="/topics" component={Topics} />
          <ProtectedRoute path="/myteam" component={MyTeam} />
          <ProtectedRoute path="/profile" component={Profile} />
          <Route path="*" component={() => '404 NOT FOUND'} />
        </Switch>
      </div>
    </Router>
  );
};

export default Routing;
