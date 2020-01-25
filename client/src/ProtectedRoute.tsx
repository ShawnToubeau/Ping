import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { connect } from 'react-redux';

// Interfaces
import { Auth } from './reducers/authReducer';
import { RootState } from 'typesafe-actions';
// Actions
import { logoutUser } from './actions/authActions';

export interface Props extends RouteProps {
  auth: Auth;
}

export const ProtectedRoute: React.FC<Props> = (
  { children, auth },
  ...rest
) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};

const mapStateToProps = (state: RootState) => ({
  errors: state.errors,
  auth: state.auth
});

export default connect(mapStateToProps, null)(ProtectedRoute);
