import React, { useEffect } from 'react';
import {
  BrowserRouter as Router, Route, Switch, Redirect,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Home from '../pages/Home';
import Topics from '../pages/Topics';
import MyTeam from '../pages/MyTeam';
import ProtectedRoute from './ProtectedRoute';
import TopNavBar from '../components/TopNavBar';
import { LOGGED_IN, LOADING_FETCH_SELF } from '../constants/AuthStatus';
import { fetchSelf } from '../state/actions/auth';
import LoadingIndicator from '../components/LoadingIndicator';
import GuestRoute from './GuestRoute';
import Subordinates from '../pages/Subordinates';
import NotFound from '../pages/NotFound';
import CookiesContainer from '../components/CookiesContainer';

const Routing = () => {
  const authStatus = useSelector(state => state.auth.status);
  const dispatch = useDispatch();

  const isLoggedIn = authStatus === LOGGED_IN;

  useEffect(() => {
    dispatch(fetchSelf());
  }, [dispatch]);

  const defaultPathComponent = () => {
    if (authStatus === LOADING_FETCH_SELF)
      return <LoadingIndicator text="Loading session..." />;
    return <Redirect to={isLoggedIn ? '/home' : '/login'} />;
  };


  if (authStatus === LOADING_FETCH_SELF)
    return <LoadingIndicator text="Loading session..." />;

  return (
    <div>
      <Router>
        <div>
          {isLoggedIn ? <TopNavBar /> : null}
          <Switch>
            <Route
              path="/"
              exact
              component={defaultPathComponent}
            />
            <GuestRoute path="/invite/:inviteId" component={Register} />
            <GuestRoute path="/login" component={Login} />
            <ProtectedRoute path="/home" component={Home} />
            <ProtectedRoute path="/topics" component={Topics} />
            <ProtectedRoute path="/myteam" component={MyTeam} />
            <ProtectedRoute path="/subordinates" component={Subordinates} />
            <Route path="*" component={NotFound} />
          </Switch>
        </div>
      </Router>
      {isLoggedIn && <CookiesContainer />}
    </div>
  );
};

export default Routing;
