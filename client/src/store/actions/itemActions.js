import * as actionTypes from './actionTypes';
import axios from '../../axios-server';

const getItems = items => ({ type: actionTypes.GET_ITEMS, items: items }); // should really name this to get items success
const getItemsLoading = () => ({ type: actionTypes.GET_ITEMS_LOADING });
const getItemsError = error => ({
  type: actionTypes.GET_ITEMS_ERROR,
  error: error
});

export const filterItemsByTagName = tagNames => ({
  type: actionTypes.FILTER_ITEMS_BY_TAG_NAME,
  tags: tagNames
});

export const fetchItems = () => dispatch => {
  dispatch(getItemsLoading());
  axios
    .get('/items')
    .then(response => {
      dispatch(getItems(response.data));
    })
    .catch(err => {
      dispatch(getItemsError(err));
    });
};

const borrowItemSuccess = (itemID, borrowerID) => ({
  type: actionTypes.BORROW_ITEM_SUCCESS,
  itemID: itemID,
  borrowerID: borrowerID
});
const borrowItemLoading = () => ({ type: actionTypes.BORROW_ITEM_LOADING });
const borrowItemFail = error => ({
  type: actionTypes.BORROW_ITEM_FAIL,
  error: error
});

export const borrowItem = (itemId, borrowerId, token) => dispatch => {
  dispatch(borrowItemLoading());
  axios({
    method: 'patch',
    url: `/items/${itemId}`,
    headers: { Authorization: `bearer ${token}` }
  })
    .then(response => {
      // response.data is actually irrelevant
      dispatch(borrowItemSuccess(itemId, borrowerId));
    })
    .catch(err => {
      dispatch(borrowItemFail(err));
    });
};

const addItemLoading = () => ({ type: actionTypes.ADD_ITEM_LOADING });
const addItemSuccess = newItem => ({
  type: actionTypes.ADD_ITEM_SUCCESS,
  newItem: newItem
});
const addItemFail = error => ({ type: actionTypes.ADD_ITEM_FAIL });

export const addItem = (itemData, token) => dispatch => {
  dispatch(addItemLoading());
  axios({
    method: 'post',
    url: `/items/`,
    headers: {
      Authorization: `bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    },
    data: itemData
  })
    .then(response => {
      dispatch(addItemSuccess(response.data));
      // you don't really need this
    })
    .catch(error => {
      dispatch(addItemFail(error));
    });
};

export const resetAfterAddItemSuccess = () => ({
  type: actionTypes.RESET_AFTER_ADD_ITEM_SUCCESS
});
