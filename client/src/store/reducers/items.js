import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';
import _ from 'lodash';

const initialState = {
  unfilteredItems: [],
  filteredItems: [],
  loading: false,
  addedItem: false,
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
      return borrowItemSuccess(state, action.itemID, action.borrowerID);
    case actionTypes.BORROW_ITEM_FAIL:
      return updateObject(state, { loading: false, error: action.error });
    case actionTypes.ADD_ITEM_SUCCESS:
      let updatedItems = state.unfilteredItems.concat(action.newItem);
      return updateObject(state, {
        unfilteredItems: updatedItems,
        addedItem: true
      });
    case actionTypes.ADD_ITEM_FAIL:
      return updateObject(state, { error: action.error });
    case actionTypes.RESET_AFTER_ADD_ITEM_SUCCESS:
      // This is potentially unnecessary and could be a bug
      return updateObject(state, { addedItem: false });
    default:
      return state;
  }
};

const borrowItemSuccess = (state, itemID, borrowerID) => {
  const updatedUnfilteredItems = state.unfilteredItems.map(item => {
    if (item._id === itemID) {
      item.borrower = borrowerID;
    }
    return item;
  });
  const updatedFilteredItems = state.filteredItems.map(item => {
    if (item._id === itemID) {
      item.borrower = borrowerID;
    }
    return item;
  });
  return updateObject(state, {
    loading: false,
    error: false,
    unfilteredItems: updatedUnfilteredItems,
    filteredItems: updatedFilteredItems
  });
};

const getFilteredItems = (state, tags) => {
  if (tags.length === 0) return state.unfilteredItems;
  return state.unfilteredItems.filter(item => {
    return _.without(tags, ...item.tags).length < tags.length;
  });
};

export default reducer;
