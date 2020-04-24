import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Topics from './pages/Topics';
import MyTeam from './pages/MyTeam';
import Profile from './pages/Profile';
import Nav from './components/routing/Nav';
import ProtectedRoute from './components/routing/ProtectedRoute';
import { setAuthenticationStatus } from './state/actions';

const Routing = () => {
  const [isAuthenticated, setAuthentificationStatus] = useState(false);

  const dispatch = useDispatch();

  const changeAuthentificationStatus = () => {
    dispatch(setAuthenticationStatus(true));
    setAuthentificationStatus(!isAuthenticated);
  };

  return (
    <Router>
      <div>
        {isAuthenticated ? <Nav /> : null}
        <Switch>
          <Route path="/" exact>
            <SignIn onSignIn={() => changeAuthentificationStatus()} />
          </Route>
          <Route path="/invitation/:id" component={SignUp} />
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
