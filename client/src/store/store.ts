import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { RootAction, RootState } from 'typesafe-actions';
import rootReducer from './root-reducer';

export const epicMiddleware = createEpicMiddleware<
  RootAction,
  RootAction,
  RootState
>();

// Configure middleware
const middleware = [epicMiddleware]; // TODO: should I include thunk?

// Rehydrate state
const initialsState = {};

// Create store
const store = createStore(
  rootReducer,
  initialsState,
  applyMiddleware(...middleware)
);

// TODO: Implement application epics
// epicMiddleware.run(rootEpic);

export default store;
