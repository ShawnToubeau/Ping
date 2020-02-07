import React from 'react';
import { Switch, BrowserRouter as Router, Redirect } from 'react-router-dom';
import { RootState } from 'typesafe-actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import jwt_decode from 'jwt-decode';
import './App.scss';

// Store
import store from '../store/store';
// Actions
import { setCurrentUser, logoutUser } from '../actions/authActions';
import setAuthToken from '../utils/setAuthToken';
// Components
import ProtectedRoute from '../components/ProtectedRoute';
import LoggedOutRoute from '../components/LoggedOutRoute';

// Components
import Dashboard from './Dashboard';
import Register from './Register';
import Login from './Login';

// Interfaces
import { Auth } from '../reducers/authReducer';
interface TokenDto {
  exp: number;
  iat: number;
}
interface Props {
  auth?: Auth;
  errors?: any;
}

// Session logic
if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  // Set Axios auth header
  setAuthToken(token);
  // Set user
  const decoded = jwt_decode<TokenDto>(token);
  store.dispatch(setCurrentUser(decoded));
  // Check if token is expired
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = './login';
  }
}

class App extends React.Component<Props> {
  render() {
    const { errors } = this.props;
    console.log(errors);

    return (
      <Router>
        <Switch>
          <Redirect exact path="/" to="/login" />
          <LoggedOutRoute path="/login" component={Login} />
          <LoggedOutRoute path="/register" component={Register} />
          <ProtectedRoute path="/dashboard" component={Dashboard} />
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  auth: state.auth
});

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      logoutUser
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
