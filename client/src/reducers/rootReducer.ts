import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';

const rootReducer = combineReducers({
  router: routerReducer,
  auth: authReducer,
  errors: errorReducer
});

export default rootReducer;
