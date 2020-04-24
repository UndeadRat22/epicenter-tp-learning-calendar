import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Home from '../pages/Home';
import Topics from '../pages/Topics';
import MyTeam from '../pages/MyTeam';
import Profile from '../pages/Profile';
import Nav from './Nav';
import { setLoginStatus } from '../state/actions';

const Routing = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const dispatch = useDispatch();

  const changeLoginStatus = () => {
    dispatch(setLoginStatus(!loggedIn));
    setLoggedIn(!loggedIn);
  };

  return (
    <Router>
      <div>
        {loggedIn ? <Nav /> : null}
        <Switch>
          <Route path="/" exact>
            <SignIn onLogin={() => changeLoginStatus()} />
          </Route>
          <Route path="/signup/:id" component={SignUp} />
          <Route path="/home" component={Home} />
          <Route path="/topics" component={Topics} />
          <Route path="/myteam" component={MyTeam} />
          <Route path="/profile" component={Profile} />
        </Switch>
      </div>
    </Router>
  );
};

export default Routing;