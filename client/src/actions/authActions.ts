import axios, { AxiosResponse } from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import User from '../models/User';

import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from './types';

// Register User
// TODO: add annotation to dispatch
export const registerUser = (userData: User) => (dispatch: any) => {
  axios
    .post('/users', userData)
    .then((res: AxiosResponse) => {
      // TODO: redirect to Login
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Login User
export const loginUser = (userData: User) => (dispatch: any) => {
  axios
    .post('/login', userData)
    .then((res: AxiosResponse) => {
      const { token } = res.data;
      // Store token in local storage
      localStorage.setItem('jwtToken', token);
      // Set token in Auth header
      setAuthToken(token);
      // Decode token
      const decodedToken = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decodedToken));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set User
export const setCurrentUser = (decoded: unknown) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Loading User
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

// Logout User
export const logoutUser = () => (dispatch: any) => {
  // Remove token from local storage
  localStorage.removeItem('jwtToken');
  // Remove Auth header
  setAuthToken(null);
  // Remove current user
  dispatch(setCurrentUser({}));
};
