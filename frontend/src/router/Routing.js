import React, { useEffect } from 'react';
import {
  BrowserRouter as Router, Route, Switch, Redirect, useHistory,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from 'wix-style-react';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Home from '../pages/Home';
import Topics from '../pages/Topics';
import MyTeam from '../pages/MyTeam';
import Profile from '../pages/Profile';
import ProtectedRoute from './ProtectedRoute';
import TopNavBar from '../components/TopNavBar';
import { LOGGED_IN, LOADING, LOGGED_OUT } from '../constants/AuthStatus';
import { fetchCurrentUser } from '../state/actions';
import LoadingIndicator from '../components/LoadingIndicator';

const Routing = () => {
  const currentUser = useSelector(state => state.currentUser);
  const isAuthenticated = currentUser.status === LOGGED_IN;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  const defaultPathComponent = () => {
    const { status } = currentUser;

    if (status === LOADING)
      return <LoadingIndicator text="Loading session..." />;

    return <Redirect to={status === LOGGED_IN ? '/home' : '/signin'} />;
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
