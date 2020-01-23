import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

import { Provider } from 'react-redux';
import store from './store/store';

// Components
import { Dashboard } from './views';
import Register from './views/Register';
import Login from './views/Login';

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <ProtectedRoute isAuthenticated={false}>
            <Route path="/dashboard" component={Dashboard} />
          </ProtectedRoute>
        </Switch>
      </Router>
    </Provider>
  );
};
