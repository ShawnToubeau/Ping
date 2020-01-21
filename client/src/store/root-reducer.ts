import { combineReducers } from 'redux';

import { routerReducer } from 'react-router-redux';
// Any other application reducers

const rootReducer = combineReducers({
  router: routerReducer
});

export default rootReducer;
