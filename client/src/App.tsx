import React from 'react';
import { Switch, BrowserRouter as Router } from 'react-router-dom';
import { RootState } from 'typesafe-actions';
import { connect, Provider } from 'react-redux';
import { bindActionCreators } from 'redux';
import jwt_decode from 'jwt-decode';

// Store
import store from './store/store';
// Actions
import { setCurrentUser, logoutUser } from './actions/authActions';
import setAuthToken from './utils/setAuthToken';
// Components
import ProtectedRoute from './components/ProtectedRoute';
import LoggedOutRoute from './components/LoggedOutRoute';

// Components
import Dashboard from './views/Dashboard';
import Register from './views/Register';
import Login from './views/Login';

// Interfaces
import { Auth } from './reducers/authReducer';
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
    const { auth, errors } = this.props;
    console.log(auth);

    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <LoggedOutRoute path="/login" component={Login} />
            <LoggedOutRoute path="/register" component={Register} />
            <ProtectedRoute path="/dashboard" component={Dashboard} />
          </Switch>
        </Router>
      </Provider>
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
