import { SET_CURRENT_USER, USER_LOADING } from '../actions/types';

// const isEmpty = require('is-empty');

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false
};

// TODO: add correct action annotation
export default (state = initialState, action: any) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      console.log(action.payload);
      return {
        ...state,
        isAuthenticated: Object.keys(action.payload).length > 0,
        user: action.payload
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};
