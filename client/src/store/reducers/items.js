import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';
import _ from 'lodash';

const initialState = {
  unfilteredItems: [],
  filteredItems: [],
  loading: false,
  error: ''
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ITEMS_LOADING:
      return updateObject(state, { loading: true });
    case actionTypes.GET_ITEMS:
      return updateObject(state, {
        unfilteredItems: action.items,
        filteredItems: action.items,
        loading: false
      });
    case actionTypes.GET_ITEMS_ERROR:
      return updateObject(state, { loading: false, error: action.error });
    case actionTypes.FILTER_ITEMS_BY_TAG_NAME:
      return updateObject(state, {
        filteredItems: getFilteredItems(state, action.tags)
      });
    case actionTypes.BORROW_ITEM_LOADING:
      return updateObject(state, { loading: true });
    case actionTypes.BORROW_ITEM_SUCCESS:
      return borrowItem();
    case actionTypes.BORROW_ITEM_FAIL:
      return updateObject(state, { loading: false, error: action.error });
    default:
      return state;
  }
};

const borrowItem = (state, borrowedItem) => {
  console.log('Borrowed ITEM: ', borrowedItem);
  console.log('Borrowed Item ID: ', borrowedItem._id);
  console.log('unfiltered items: ', state.unfilteredItems);
  return state;
};

const getFilteredItems = (state, tags) => {
  if (tags.length === 0) return state.unfilteredItems;
  return state.unfilteredItems.filter(item => {
    return _.without(tags, ...item.tags).length < tags.length;
  });
};

export default reducer;
