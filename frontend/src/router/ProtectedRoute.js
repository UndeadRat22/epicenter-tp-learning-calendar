import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LOGGED_IN, LOADING_FETCH_SELF } from '../constants/AuthStatus';
import LoadingIndicator from '../components/LoadingIndicator';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const auth = useSelector(state => state.auth);
  const isAuthenticated = auth.status === LOGGED_IN;


  return (
    <Route
      {...rest}
      render={props => {
        if (isAuthenticated)
          return <Component {...props} />;
        if (auth.status === LOADING_FETCH_SELF)
          return <LoadingIndicator text="Loading session..." />;

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
