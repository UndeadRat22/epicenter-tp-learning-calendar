import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = useSelector(state => state.isAuthenticated);

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
