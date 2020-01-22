import { GET_ERRORS } from '../actions/types';

const initialState = {};

// TODO: add action annotation
export default (state = initialState, action: any) => {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    default:
      return state;
  }
};
