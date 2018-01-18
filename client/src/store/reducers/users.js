import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  users: [],
  loading: false,
  error: ''
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_USERS_LOADING:
      return updateObject(state, { loading: true });
    case actionTypes.GET_USERS:
      return updateObject(state, {
        users: action.users,
        loading: false
      });
    case actionTypes.GET_USERS_ERROR:
      return updateObject(state, { loading: false, error: action.error });
    default:
      return state;
  }
};

export default reducer;
