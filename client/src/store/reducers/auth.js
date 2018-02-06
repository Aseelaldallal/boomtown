import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  loading: false,
  auth_user_id: null,
  auth_user_token: null,
  auth_error: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REGISTER_REQUEST:
      return updateObject(state, { loading: true });
    case actionTypes.REGISTER_SUCCESS:
      return updateObject(state, {
        loading: false,
        auth_error: [],
        auth_user_id: action.id,
        auth_user_token: action.token
      });
    case actionTypes.REGISTER_FAIL:
      return updateObject(state, {
        loading: false,
        auth_user_id: null,
        auth_user_token: null,
        auth_error: [...action.error]
      });
    case actionTypes.LOGIN_REQUEST:
      return updateObject(state, { loading: true });
    case actionTypes.LOGIN_FAIL:
      return updateObject(state, {
        loading: false,
        auth_user_id: null,
        auth_user_token: null,
        auth_error: [...action.error]
      });
    case actionTypes.LOGIN_SUCCESS:
      return updateObject(state, {
        loading: false,
        auth_error: [],
        auth_user_id: action.id,
        auth_user_token: action.token
      });
    default:
      return state;
  }
};

export default reducer;
