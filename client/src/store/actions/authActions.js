import * as actionTypes from './actionTypes';
import axios from '../../axios-server';

// ==================== REGISTER ACTIONS ==================== //

export const registerUser = formData => dispatch => {
  dispatch(registerRequest()); // Set Loading to true
  axios
    .post('/register', formData)
    .then(response => {
      saveInLocalStorage(response);
      dispatch(checkAuthTimeout(response.data.expiry));
      dispatch(registerSuccess(response.data)); // response.data is user
    })
    .catch(err => {
      if (err.response && err.response.data && err.response.data.messages) {
        dispatch(registerFail(err.response.data.messages));
      } else {
        dispatch(registerFail(err.message));
      }
    });
};

const registerRequest = () => ({ type: actionTypes.REGISTER_REQUEST });
const registerSuccess = data => ({
  type: actionTypes.REGISTER_SUCCESS,
  id: data.id,
  token: data.token,
  fullname: data.fullname,
  bio: data.bio,
  email: data.email
});
const registerFail = error => ({
  type: actionTypes.REGISTER_FAIL,
  error: error
});

// ====================== LOGIN ACTIONS ===================== //

export const loginUser = formData => dispatch => {
  dispatch(loginRequest()); // Set Loading to true
  axios
    .post('/login', formData)
    .then(response => {
      saveInLocalStorage(response);
      dispatch(checkAuthTimeout(response.data.expiry));
      dispatch(loginSuccess(response.data)); // response.data is user
    })
    .catch(err => {
      if (err.response && err.response.data && err.response.data.messages) {
        dispatch(loginFail(err.response.data.messages));
      } else {
        dispatch(loginFail(err.message));
      }
    });
};

const loginRequest = () => ({ type: actionTypes.LOGIN_REQUEST });
const loginSuccess = data => ({
  type: actionTypes.LOGIN_SUCCESS,
  id: data.id,
  token: data.token,  
  fullname: data.fullname,
  bio: data.bio,
  email: data.email
});
const loginFail = error => ({
  type: actionTypes.LOGIN_FAIL,
  error: error
});

// =================== CHECK AUTH STATE =================== //

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      const userId = localStorage.getItem('userId');
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(loginSuccess({ id: userId, token: token }));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};

// ==================== LOGOUT ACTIONS ==================== //

const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const logout = () => {

  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
  return {
    type: actionTypes.LOGOUT
  };
};
// ====================== HELPER FUNCS ====================== //

const saveInLocalStorage = response => {
  const expirationDate = new Date(
    new Date().getTime() + response.data.expiry * 1000
  );
  localStorage.setItem('token', response.data.token);
  localStorage.setItem('expirationDate', expirationDate);
  localStorage.setItem('userId', response.data.id);
};
