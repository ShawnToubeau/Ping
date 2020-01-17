import React from 'react';
import {
  Switch,
  Route
} from "react-router-dom";
import ProtectedRoute from './ProtectedRoute'
import { Login, Register, Dashboard } from './views';

export const App: React.FC = () => {
  return (
    <Switch>
      <Route path='/login' component={Login} />
      <Route path='/register' component={Register} />
      <ProtectedRoute isAuthenticated={false}>
        <Route path="/dashboard" component={Dashboard} />
      </ProtectedRoute>
    </Switch>
  );
}