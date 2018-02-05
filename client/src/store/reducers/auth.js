import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  loading: false,
  auth_user: null,
  auth_error: ''
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REGISTER_REQUEST:
      return updateObject(state, { loading: true });
    case actionTypes.REGISTER_SUCCESS:
      return updateObject(state, {
        loading: false,
        auth_error: '',
        auth_user: action.user
      });
    case actionTypes.REGISTER_FAIL:
      return updateObject(state, {
        loading: false,
        auth_user: null,
        auth_error: action.error
      });
    default:
      return state;
  }
};

export default reducer;
