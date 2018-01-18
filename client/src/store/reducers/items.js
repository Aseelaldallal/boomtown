import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  items: [],
  loading: false,
  error: ''
};

const reducer = (state = initialState, action) => {
  console.log('HI IM IN THE REDUCER!!!!!!');
  switch (action.type) {
    case actionTypes.GET_ITEMS_LOADING:
      return updateObject(state, { loading: true });
    case actionTypes.GET_ITEMS:
      console.log('GET ITEMS!!');
      return updateObject(state, { items: action.items, loading: false });
    case actionTypes.GET_ITEMS_ERROR:
      return updateObject(state, { loading: false, error: action.error });
    default:
      return state;
  }
};

export default reducer;
