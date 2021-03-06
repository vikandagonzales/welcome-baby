import Auth from '../models/auth';

export const GET_USER = 'GET_USER';
export const NOT_LOGGED_IN = 'NOT_LOGGED_IN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGIN_RESET = 'LOGIN_RESET';
export const LOGOUT = 'LOGOUT';

export const getUser = () => {
  return async dispatch => {
    try {
      const token = await Auth.getUser();
      dispatch({type: GET_USER, payload: token});
    } catch (err) {
      dispatch({type: NOT_LOGGED_IN, payload: err});
    }
  };
};

export const login = (credentials, history) => {
  return async dispatch => {
    try {
      const payload = await Auth.login(credentials);
      dispatch({type: LOGIN_SUCCESS, payload});
      history.push('/invitation');
    } catch (err) {
      dispatch({type: LOGIN_FAILURE, payload: err});
    }
  };
};

export const loginReset = () => {
  return dispatch => {
    dispatch({type: LOGIN_RESET});
  };
};

export const logout = () => {
  return dispatch => {
    localStorage.removeItem('token');
    dispatch({type: LOGOUT});
  };
};