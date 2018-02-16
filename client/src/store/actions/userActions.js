import * as actionTypes from './actionTypes';
import axios from 'axios';

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
