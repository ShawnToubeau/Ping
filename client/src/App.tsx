import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

// Components
import Dashboard from './views/Dashboard';
import Register from './views/Register';
import Login from './views/Login';
import ProtectedRoute from './ProtectedRoute';
import { RootState } from 'typesafe-actions';
import { connect } from 'react-redux';
import { Auth } from './reducers/authReducer';

interface Props {
  auth?: Auth;
  errors?: any;
}

class App extends React.Component<Props> {
  render() {
    const { auth, errors } = this.props;
    console.log(auth);

    return (
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <ProtectedRoute path="/dashboard" component={Dashboard} />
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  auth: state.auth
});

export default connect(mapStateToProps, null)(App);
