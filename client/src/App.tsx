import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import ProtectedRoute from './ProtectedRoute';
import { Login, Register, Dashboard } from './views';

export const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const dbUrl = 'http://localhost:4000/login-status';

  useEffect(() => {
    axios
      .get(dbUrl)
      .then((res: AxiosResponse) => {
        console.log(res);
        // setIsAuthenticated()
      })
      .catch(err => console.log(err));
  }, [isAuthenticated]);

  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <ProtectedRoute isAuthenticated={false}>
        <Route path="/dashboard" component={Dashboard} />
      </ProtectedRoute>
    </Switch>
  );
};
