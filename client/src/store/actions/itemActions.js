import * as actionTypes from './actionTypes';
import axios from 'axios';

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
    .get('http://localhost:3001/items')
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
    url: `http://localhost:3001/items/${itemId}`,
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
  console.log('ITEMDATA: ', itemData);
  console.log('tokenn: ', token);
  dispatch(addItemLoading());
  axios({
    method: 'post',
    url: `http://localhost:3001/items/`,
    headers: { Authorization: `bearer ${token}` },
    data: itemData
  })
    .then(response => {
      console.log(response.data);
      //dispatch addItemSuccess
    })
    .catch(error => {
      console.log(error);
      //dispatch addItemFail
    });
};
