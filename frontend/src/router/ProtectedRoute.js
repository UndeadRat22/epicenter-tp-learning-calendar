import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LOGGED_IN } from '../constants/AuthStatus';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const currentUser = useSelector(state => state.currentUser);
  const isAuthenticated = currentUser.status === LOGGED_IN;

  return (
    <Route
      {...rest}
      render={props => {
        if (isAuthenticated)
          return <Component {...props} />;

        return (
          <Redirect to={
                        {
                          pathname: '/',
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

export default ProtectedRoute;
