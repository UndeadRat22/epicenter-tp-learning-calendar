import React, { useState, useEffect } from 'react';
import '../App.global.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import Home from '../screens/Home';
import Topics from '../screens/Topics';
import MyTeam from '../screens/MyTeam';
import Profile from '../screens/Profile';
import Nav from './Nav';
import { useSelector, useDispatch } from 'react-redux';
import { setLoginStatus } from '../state_manager/actions';

function Rounting() {
  const [loggedIn, setLoggedIn] = useState(false);

  const dispatch = useDispatch();
  // const loginStatus = useSelector(state => state.loginStatus);

  const changeLogginStatus = () => {
    dispatch(setLoginStatus(!loggedIn));
    setLoggedIn(!loggedIn);
  };

  return (
    <Router>
      <div className="App">
        {loggedIn ? <Nav /> : null}
        <Switch>
          <Route path="/" exact>
            {' '}
            <SignIn callback={() => changeLogginStatus()} />{' '}
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
}

export default Rounting;
