import * as actionTypes from './actionTypes';
import axios from 'axios';

// ====================== ITEMS ACTIONS ====================== //

const getItems = items => ({ type: actionTypes.GET_ITEMS, items: items });
const getItemsLoading = () => ({ type: actionTypes.GET_ITEMS_LOADING });
const getItemsError = error => ({ type: actionTypes.GET_ITEMS_ERROR });

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
