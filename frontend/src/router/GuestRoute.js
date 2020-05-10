import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LOGGED_IN } from '../constants/AuthStatus';

const GuestRoute = ({ component: Component, ...rest }) => {
  const authStatus = useSelector(state => state.auth.status);
  const isLoggedIn = authStatus === LOGGED_IN;

  return (
    <Route
      {...rest}
      render={props => {
        if (!isLoggedIn)
          return <Component {...props} />;

        return (
          <Redirect to={
                        {
                          pathname: '/home',
                          state: {
                            from: props.location,
                          },
                        }
                    }
          />
        );
      }}
    />
  );
};

export default GuestRoute;
