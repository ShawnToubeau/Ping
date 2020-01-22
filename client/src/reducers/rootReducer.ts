import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import { RouteComponentProps } from 'react-router-dom';

const rootReducer = combineReducers({
  router: routerReducer,
  auth: authReducer,
  errors: errorReducer
});

export default rootReducer;
