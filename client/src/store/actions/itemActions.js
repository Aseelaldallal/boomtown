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
  console.log('Going to borrow item');
  console.log('params: ', itemId, ' ', borrowerId, ' ', token);
  dispatch(borrowItemLoading());
  axios({
    method: 'patch',
    url: `http://localhost:3001/items/${itemId}`,
    headers: { Authorization: `bearer ${token}` }
  })
    .then(response => {
      console.log('response: ', response.data); // response.data is actually irrelevant
      dispatch(borrowItemSuccess(itemId, borrowerId));
    })
    .catch(err => {
      console.log('error: ', err);
      dispatch(borrowItemFail(err));
    });
};
