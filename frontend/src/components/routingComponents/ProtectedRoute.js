import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = useSelector(state => state.isAuthenticated);

  return (
    <Route
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      render={props => {
        if (isAuthenticated)
          // eslint-disable-next-line react/jsx-props-no-spreading
          return <Component {...props} />;
        // eslint-disable-next-line no-else-return
        else {
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
        }
      }}
    />
  );
};

export default ProtectedRoute;
