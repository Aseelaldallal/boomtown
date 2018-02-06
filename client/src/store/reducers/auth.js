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
      console.log("Reducer: Register Fail");
      console.log("Error: ", action.error);
      return updateObject(state, {
        loading: false,
        auth_user_id: null,
        auth_user_token: null,
        auth_error: [...action.error]
      });
    default:
      return state;
  }
};

export default reducer;
