import * as actionTypes from './actionTypes';

const getItems = items => ({ type: actionTypes.GET_ITEMS, items: items });
const getItemsLoading = () => ({ type: actionTypes.GET_ITEMS_LOADING });
const getItemsError = error => ({ type: actionTypes.GET_ITEMS_ERROR });

export const filterItemsByTagName = tagNames => ({
  type: actionTypes.FILTER_ITEMS_BY_TAG_NAME,
  tags: tagNames
});

export const fetchItemsAndUsers = () => dispatch => {
  dispatch(getItemsLoading());
  let itemsAPI = 'http://localhost:3001/items';
  let usersAPI = 'http://localhost:3001/users';
  const urls = [itemsAPI, usersAPI];
  Promise.all(urls.map(curr => fetch(curr).then(resp => resp.json())))
    .then(data => {
      linkItemsToUsers(dispatch, data[0], data[1]);
    })
    .catch(error => dispatch(getItemsError(error)));
};

// HELPER METHODS
function linkItemsToUsers(dispatch, items, users) {
  const updatedItems = items.map(item => {
    const borrower = users.find(user => item.borrower === user.id);
    if (borrower) item.borrower = borrower;
    item.itemowner = users.find(user => user.id === item.itemowner);
    return item;
  });
  dispatch(getItems(updatedItems));
}
