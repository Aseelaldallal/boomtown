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

export const fetchItemsAndUsers = () => dispatch => {
  dispatch(getItemsLoading());
  dispatch(getUsersLoading());
  let itemsAPI = 'http://localhost:3001/items';
  let usersAPI = 'http://localhost:3001/users';
  const urls = [itemsAPI, usersAPI];
  Promise.all(urls.map(curr => fetch(curr).then(resp => resp.json())))
    .then(data => {
      dispatch(getUsers(data[1]));
      linkItemsToUsers(dispatch, data[0], data[1]); // 0 = items, 1 = users
    })
    .catch(error => {
      dispatch(getItemsError(error));
      dispatch(getUsersError(error));
    });
};

// ======================= USER ACTIONS ======================= //

const getUsers = users => ({ type: actionTypes.GET_USERS, users: users });
const getUsersLoading = () => ({ type: actionTypes.GET_USERS_LOADING });
const getUsersError = error => ({ type: actionTypes.GET_USERS_ERROR });

// ====================== HELPER METHODS ====================== //

function linkItemsToUsers(dispatch, items, users) {
  const updatedItems = items.map(item => {
    const borrower = users.find(user => item.borrower === user._id);
    if (borrower) item.borrower = borrower;
    item.itemowner = users.find(user => user._id === item.itemowner);
    return item;
  });
  dispatch(getItems(updatedItems));
}

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

// Dont forget to add to local storage

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

// Dont forget to add to local storage

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

// ==================== LOGOUT ACTIONS ==================== //

const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const logout = () => {
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
};
