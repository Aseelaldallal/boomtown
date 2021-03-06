import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  loading: false,
  auth_user_id: null,
  auth_user_token: null,
  auth_user_fullname: null,
  auth_user_bio: null,
  auth_user_email: null,
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
        auth_user_token: action.token,
        auth_user_fullname: action.fullname,
        auth_user_bio: action.bio,
        auth_user_email: action.email
      });
    case actionTypes.REGISTER_FAIL:
      return updateObject(state, {
        loading: false,
        auth_error: [...action.error]
      });
    case actionTypes.LOGIN_REQUEST:
      return updateObject(state, { loading: true });
    case actionTypes.LOGIN_FAIL:
      return updateObject(state, {
        loading: false,
        auth_error: [...action.error]
      });
    case actionTypes.LOGIN_SUCCESS:
      return updateObject(state, {
        loading: false,
        auth_error: [],
        auth_user_id: action.id,
        auth_user_token: action.token,
        auth_user_fullname: action.fullname,
        auth_user_bio: action.bio,
        auth_user_email: action.email
      });
    case actionTypes.LOGOUT:
      return updateObject(state, {
        auth_user_id: null,
        auth_user_token: null,
        auth_user_fullname: null,
        auth_user_bio: null,
        auth_user_email: null
      });
    default:
      return state;
  }
};

export default reducer;
