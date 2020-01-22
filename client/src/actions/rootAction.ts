import { routerActions } from 'react-router-redux';
import { RouteComponentProps } from 'react-router-dom';
import * as authActions from './authActions';

export default {
  router: routerActions,
  auth: authActions
};
