import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

// Components
import { Dashboard } from './views';
import Register from './views/Register';
import Login from './views/Login';
import ProtectedRoute from './ProtectedRoute';

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <ProtectedRoute>
            <Route path="/dashboard" component={Dashboard} />
          </ProtectedRoute>
        </Switch>
      </Router>
    );
  }
}
