import * as actionTypes from './actionTypes';
import axios from 'axios';

// ====================== ITEMS ACTIONS ====================== //

const getItems = items => ({ type: actionTypes.GET_ITEMS, items: items });
const getItemsLoading = () => ({ type: actionTypes.GET_ITEMS_LOADING });
const getItemsError = error => ({ type: actionTypes.GET_ITEMS_ERROR });

export const filterItemsByTagName = tagNames => ({
  type: actionTypes.FILTER_ITEMS_BY_TAG_NAME,
  tags: tagNames
});

export const fetchItems = () => dispatch => {
  dispatch(getItemsLoading());
  axios
    .get('http://localhost:3001/items')
    .then(response => {
      dispatch(getItems(response.data));
    })
    .catch(err => {
      dispatch(getItemsError(err));
    });
};

// ======================= USER ACTIONS ======================= //

const getUsers = users => ({ type: actionTypes.GET_USERS, users: users });
const getUsersLoading = () => ({ type: actionTypes.GET_USERS_LOADING });
const getUsersError = error => ({ type: actionTypes.GET_USERS_ERROR });

export const fetchUsers = () => dispatch => {
  console.log('Fetching Users action');
  dispatch(getUsersLoading());
  axios
    .get('http://localhost:3001/users')
    .then(response => {
      dispatch(getUsers(response.data));
    })
    .catch(err => {
      dispatch(getUsersError(err));
    });
};

// ==================== REGISTER ACTIONS ==================== //

export const registerUser = formData => dispatch => {
  dispatch(registerRequest()); // Set Loading to true
  axios
    .post('http://localhost:3001/register', formData)
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
  token: data.token
});
const registerFail = error => ({
  type: actionTypes.REGISTER_FAIL,
  error: error
});

// ====================== LOGIN ACTIONS ===================== //

export const loginUser = formData => dispatch => {
  dispatch(loginRequest()); // Set Loading to true
  axios
    .post('http://localhost:3001/login', formData)
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
  token: data.token
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
  console.log('in logout');
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
