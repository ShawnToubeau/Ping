import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { composeWithDevTools } from 'redux-devtools-extension';
import { RootAction, RootState } from 'typesafe-actions';
import rootReducer from '../reducers/rootReducer';
import thunk from 'redux-thunk';

export const epicMiddleware = createEpicMiddleware<
  RootAction,
  RootAction,
  RootState
>();

// Configure middleware
let middleware = applyMiddleware(epicMiddleware, thunk);

// Rehydrate state
const initialsState = {};

if (process.env.NODE_ENV === 'development') {
  middleware = composeWithDevTools({ trace: true, traceLimit: 25 })(middleware);
} else {
  middleware = compose(middleware);
}

// Create store
const store = createStore(rootReducer, initialsState, middleware);

// TODO: Implement application epics
// epicMiddleware.run(rootEpic);

export default store;
