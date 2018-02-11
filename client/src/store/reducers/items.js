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
      return borrowItemSuccess(state, action.itemID, action.borrowerID);
    case actionTypes.BORROW_ITEM_FAIL:
      return updateObject(state, { loading: false, error: action.error });
    default:
      return state;
  }
};

const borrowItemSuccess = (state, itemID, borrowerID) => {
  const updatedUnfilteredItems = state.unfilteredItems.map(item => {
    console.log('1: ', item._id);
    console.log('2: ', itemID);
    if (item._id === itemID) {
      console.log('HERE');
      item.borrower = borrowerID;
      console.log('item: ', item);
    }
    return item;
  });
  console.log('updated unfil: ', updatedUnfilteredItems);
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
