import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { connect } from 'react-redux';

// Interfaces
import { Auth } from '../reducers/authReducer';
import { RootState } from 'typesafe-actions';
interface Props extends RouteProps {
  auth?: Auth;
}

class ProtectedRoute extends Route<Props> {
  render() {
    const { component, path, auth } = this.props;

    if (auth && auth.isAuthenticated) {
      return <Route path={path} component={component} />;
    }

    return <Redirect to={{ pathname: '/login' }} />;
  }
}

const mapStateToProps = (state: RootState) => ({
  auth: state.auth
});

export default connect(mapStateToProps, null)(ProtectedRoute);
